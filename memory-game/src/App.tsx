import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const [clickAmount, setClickAmount] = useState<number>(0);
  const [clickedGridValues, setClickedGridValues] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean>(false);

  //TODO: initialize grid items array, each item taking a number and isVisible boolean

  const [gridItems, setGridItems] = useState<
    {
      number: number;
      isVisible: boolean;
    }[]
  >([]);

  //TODO: find a way to shuffle - Fisher Yates shuffle (stackoverflow)
  function shuffle(array: number[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
  //TODO: duplicate the numbers array to have 12 values and shuffle it
  const shuffledItems = () => {
    const shuffledItems = numbers.flatMap((i) => [
      { number: i, isVisible: false },
      { number: i, isVisible: false },
    ]);
    shuffle(shuffledItems);
    return shuffledItems;
  };

  // Set grid items to the shuffled array
  useEffect(() => {
    setGridItems(shuffledItems());
  }, []);


  //TODO: when a specific grid is clicked, show that grid's value.
  const handleClick = (index: number) => {
    if (clickAmount >= 2 && !clickedGridValues.includes(index)) {
      return;
    }

    if (clickedGridValues.includes(index)) {
      setClickedGridValues((prev) => prev.filter((item) => item !== index));
      setClickAmount((prev) => prev - 2); // Decrement click amount after removing
    } else {
      setClickedGridValues((prev) => [...prev, index]);
    }

    setGridItems((currentItems) =>
      currentItems.map((item, i) => {
        if (i === index) {
          return { ...item, isVisible: !item.isVisible };
        }
        return item;
      })
    );
   console.log(gridItems[index])

    setClickAmount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(clickedGridValues.length);
  }, [clickedGridValues]);

  return (
    <>
      <div className="grid-container">
        {gridItems?.map((grid, i) => (
          <div
            onClick={() => handleClick(i)}
            key={i}
            className="grid-item"
            style={{ backgroundColor: correct ? "red" : "white" }}
          >
            <p className="value" key={i}>
              {grid.isVisible ? grid.number : ""}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
