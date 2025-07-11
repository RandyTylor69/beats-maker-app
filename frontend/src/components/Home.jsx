import Pads from "./Pads";
import Tasks from "./Tasks";
import React from "react";
import { pads } from "../data";

export default function Home() {
  // vars for Tasks.jsx
  const [isStart, setIsStart] = React.useState(false);
  const [tempo, setTempo] = React.useState(30);

  // vars for Pads.jssx
  const [padsData, setPadsData] = React.useState(pads);
  const interval = React.useRef(null);
  const timeouts = React.useRef([]);
  const delay = 500;

  // --- FUNCTIONS FOR TASKS.JSX

  function activate(pad) {
    // scaling the pad
    if (pad.on) {
      console.log(pad.id);
    }
  }

  function toggleStart(e) {
    e.preventDefault();

    // 1. grabbing the Tempo (deafault at 30)
    const formData = tempo;

    // 2. change "start" to "pause" or vise versa
    setIsStart((prev) => !prev);
  }

  // ---------------- testing --------------

  const array = [1, 2, 3, 4];

  function activate(pad) {
    // 1. enlarge the pad
    setPadsData((prev) =>
      prev.map((item) => {
        return item.id === pad.id ? { ...item, scale: 1.2 } : item;
      })
    );
    // 2. reduce the pad (after a while)
    setTimeout(() => {
      setPadsData((prev) =>
        prev.map((item) => {
          return item.id === pad.id ? { ...item, scale: 1 } : item;
        })
      );
    }, 250);
  }

  function arraySlicer(array) {
    // expecting a array of 3 by 8 = 24 elements,
    // slicing them to 3 arrays of 8 elements,
    // returning an array of the 3 sliced arrays.
    const arr1 = array.slice(0, 8);
    const arr2 = array.slice(8, 16);
    const arr3 = array.slice(16, 24);
    return [arr1, arr2, arr3];
  }

  // -----

  

  // -----

  function looping(array) {
    // 1. Starting from each of the 3 sliced arrays
    for (let arr of arraySlicer(array)) {

      // 2. Looping through each sliced array
      for (let j of arr) {
        timeouts.current.push(
          setTimeout(() => {
            activate(j)
          }, arr.indexOf(j) * delay)
        );
      }
    }
  }

  React.useEffect(() => {
    if (isStart) {
      // first function call (no delay)
      looping(padsData);
      interval.current = setInterval(() => {
        looping(padsData);
      }, 8 * delay);
    } else if (!isStart) {
      clearInterval(interval.current);
      for (let i of timeouts.current) {
        clearTimeout(i);
      }
      timeouts.current.length = 0;
    }
  }, [isStart]);

  // ----------------------------------------

  return (
    <div className="web-body">
      <section className="action-area">
        <Pads padsData={padsData} setPadsData={setPadsData} isStart={isStart} />
      </section>
      <section className="task-area">
        <Tasks
          padsData={padsData}
          toggleStart={toggleStart}
          tempo={tempo}
          setTempo={setTempo}
          isStart={isStart}
        />
      </section>
    </div>
  );
}
