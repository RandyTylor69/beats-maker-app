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

  React.useEffect(() => {
    if (isStart) {
      // first function call (no delay)
      for (let i of array) {
        timeouts.current.push(
          setTimeout(() => {
            console.log(i);
          }, array.indexOf(i) * delay)
        );
      }
      interval.current = setInterval(() => {
        for (let i of array) {
          timeouts.current.push(
            setTimeout(() => {
              console.log(i);
            }, array.indexOf(i) * delay)
          );
        }
      }, 4 * delay);
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
