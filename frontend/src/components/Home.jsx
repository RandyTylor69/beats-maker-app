import Pads from "./Pads";
import Tasks from "./Tasks";
import Keyboard from "./Keyboard";
import React from "react";
import { pads } from "../data";

export default function Home() {
  // vars for Tasks.jsx
  const [isStart, setIsStart] = React.useState(false);
  const [tempo, setTempo] = React.useState(80);
  const [soundChoices, setSoundChoices] = React.useState({
    hihat: "hihat-open",
    snare: "snare-acoustic",
    kick: "kick-clear",
  });
  const updatedSoundChoices = React.useRef(null);
  updatedSoundChoices.current = soundChoices;
  const [keyboardChoice, setKeyboardChoice] = React.useState("bass");
  const [openKeyPositions, setOpenKeyPositions] = React.useState(true);

  // vars for Pads.jssx
  const [padsData, setPadsData] = React.useState(pads);
  const updatedPadsData = React.useRef(null);
  updatedPadsData.current = padsData;
  const interval = React.useRef(null);
  const timeouts = React.useRef([]);

  // --- FUNCTIONS FOR TASKS.JSX

  function toggleStart(e) {
    e.preventDefault();
    // 1. change "start" to "pause" or vise versa
    setIsStart((prev) => !prev);
  }

  // Since no real music producer will use this app,
  // the tempo shown here is purely imaginative.

  // a medium tempo of 50 represents 200ms of delay.
  

  
  const delay = 1000/(tempo/10)

  function makeSound(pad) {
    const sound = new Audio(
      `/sounds/${updatedSoundChoices.current[pad.type]}.wav`
    );
    sound.play();
  }

  function activate(pad) {
    // 1. enlarge the pad size
    setPadsData((prev) =>
      prev.map((item) => {
        return item.id === pad.id ? { ...item, scale: 1.2 } : item;
      })
    );

    // 2. make sound
    if (pad.on) makeSound(pad);

    // 3. reduce the pad size (after a while)
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
    const arr1 = array.slice(0, 16);
    const arr2 = array.slice(16, 32);
    const arr3 = array.slice(32, 48);
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
            activate(j);
          }, arr.indexOf(j) * delay)
        );
      }
    }
  }

  React.useEffect(() => {
    if (isStart) {
      // first function call (no delay)
      looping(updatedPadsData.current);
      // second function call (looped with delay)
      interval.current = setInterval(() => {
        looping(updatedPadsData.current);
      }, 16 * delay);
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
        <Pads
          padsData={padsData}
          setPadsData={setPadsData}
          isStart={isStart}
          soundChoices={soundChoices}
          setSoundChoices={setSoundChoices}
          updatedPadsData={updatedPadsData}
        />
      </section>
      <section className="task-area">
        <Keyboard
          keyboardChoice={keyboardChoice}
          setKeyboardChoice={setKeyboardChoice}
          openKeyPositions={openKeyPositions}
          setOpenKeyPositions={setOpenKeyPositions}
        />
        <Tasks
          padsData={padsData}
          toggleStart={toggleStart}
          tempo={tempo}
          setTempo={setTempo}
          isStart={isStart}
          keyboardChoice={keyboardChoice}
          setKeyboardChoice={setKeyboardChoice}
          openKeyPositions={openKeyPositions}
          setOpenKeyPositions={setOpenKeyPositions}
          // for the server
          updatedSoundChoices = {updatedSoundChoices.current}
          updatedPadsData = {updatedPadsData.current}
        />
      </section>
    </div>
  );
}
