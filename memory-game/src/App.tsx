import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const [clickedGridItems, setClickedGridItems] = useState<
    { tileId: number; value: number }[]
  >([]);
  const [canClick, setCanClick] = useState<boolean>(true);
  const [matchesFound, setMatchesFound] = useState<number[]>([]);
  const [gridItems, setGridItems] = useState<
    { number: number; isVisible: boolean }[]
  >([]);

  // Function to shuffle the array
  function shuffle(array: any[]) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  // Duplicate and shuffle the numbers array to create grid items
  const initializeGridItems = () => {
    const duplicatedNumbers = numbers.flatMap((i) => [
      { number: i, isVisible: false },
      { number: i, isVisible: false },
    ]);
    shuffle(duplicatedNumbers);
    setGridItems(duplicatedNumbers);
  };

  useEffect(() => {
    initializeGridItems();
  }, []);

  const handleClick = (index: number) => {
    if (!canClick || gridItems[index].isVisible) return; //if canClick is false OR the clicked grid is already visible, return

    const newGridItems = [...gridItems]; //initialize newGridItems array by spreading the gridItems array
    newGridItems[index].isVisible = true; //when a grid is clicked, set the corresponding item's isVisible to true
    setGridItems(newGridItems); //set the grid items to the newItems to update the grid

    const clickedValue = { tileId: index, value: gridItems[index].number };//initiliaze an object to store the clicked grid's ID and value

    if (clickedGridItems.length === 0) { //if no grid item has been clicked, add the clicked grid item to the clickedGridItems
      setClickedGridItems([clickedValue]);
    } else {
      setCanClick(false); //if clickGridItems has length, it means user has clicked on a grid already and we are at 2nd click
      const [firstClickedValue] = clickedGridItems; //initialize firstClickedValue by destructuring clickedGridItems
      if (clickedValue.value === firstClickedValue.value) { //if the current grid value matches the first clicked grid value,
        setMatchesFound((prev) => [...prev, clickedValue.value]); //add the current clicked grid's value to matches found.
        setClickedGridItems([]); //reset clicked grid items
        setCanClick(true); //set canClick to true so that user can look for next pairs
      } else {
        setTimeout(() => { //if they are not a match, create a boolean based on matchesFound includes any of the grids' value,
          setGridItems(
            // (it should NOT).Set the isVisible to the boolean.
            gridItems.map((item) => ({
              ...item,
              isVisible: matchesFound.includes(item.number),
            }))
          );
          setClickedGridItems([]); //reset clicked gridItems
          setCanClick(true); //set canClick to true
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="grid-container">
        {gridItems.map((grid, i) => (
          <div
            onClick={() => handleClick(i)}
            key={i}
            className={`grid-item ${
              matchesFound.includes(grid.number) ? "matched" : "grid-item"
            }`}
          >
            {grid.isVisible ? grid.number : ""}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
