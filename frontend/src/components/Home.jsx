import Pads from "./Pads";
import Tasks from "./Tasks";
import Keyboard from "./Keyboard";
import React from "react";
import  pads  from "../data";

export default function Home() {
  const [hihats1, setHihats1] = React.useState([
    { label: "hihat1-open", value: "hihat1-open", type: "hihat" },
    { label: "hihat1-closed", value: "hihat1-closed", type: "hihat" },
    { label: "hihat1-accent", value: "hihat1-accent", type: "hihat" },
    { label: "hihat1-chick", value: "hihat1-chick", type: "hihat" },
  ]);
  const [hihats2, setHihats2] = React.useState([
    { label: "hihat2-closed", value: "hihat2-closed", type: "hihat" },
    { label: "hihat2-open", value: "hihat2-open", type: "hihat" },
    { label: "hihat2-accent", value: "hihat2-accent", type: "hihat" },
    { label: "hihat2-chick", value: "hihat2-chick", type: "hihat" },
  ]);
  const [snares, setSnares] = React.useState([
    { label: "snare-acoustic", value: "snare-acoustic", type: "snare" },
    { label: "snare-power", value: "snare-power", type: "snare" },
    { label: "snare-rim", value: "snare-rim", type: "snare" },
    { label: "snare-rock", value: "snare-rock", type: "snare" },
  ]);
  const [kicks, setKicks] = React.useState([
    { label: "kick-clear", value: "kick-clear", type: "kick" },
    { label: "kick-house", value: "kick-house", type: "kick" },
    { label: "kick-rifle", value: "kick-rifle", type: "kick" },
    { label: "kick-synth", value: "kick-synth", type: "kick" },
    { label: "kick-swedish", value: "kick-swedish", type: "kick" },
  ]);

  // vars for Tasks.jsx
  const [isStart, setIsStart] = React.useState(false);
  const [tempo, setTempo] = React.useState(50);
  const [soundChoices, setSoundChoices] = React.useState({
    hihat1: hihats1[0].value,
    hihat2: hihats2[0].value,
    snare: snares[0].value,
    kick: kicks[0].value,
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
    const arr4 = array.slice(48, 64);
    return [arr1, arr2, arr3, arr4];
  }

  // the tempo shown here is purely imaginative.
  // a medium tempo of 50 represents 200ms of delay.

  const delay = 1000 / (tempo / 10);

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
          updatedSoundChoices={updatedSoundChoices.current}
          // for the instrument choices
          hihats1={hihats1}
          setHihats1={setHihats1}
          hihats2={hihats2}
          setHihats2={setHihats2}
          snares={snares}
          setSnares={setSnares}
          kicks={kicks}
          setKicksc={setKicks}
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
          setPadsData={setPadsData}
          soundChoices={soundChoices}
          setSoundChoices={setSoundChoices}
          toggleStart={toggleStart}
          tempo={tempo}
          setTempo={setTempo}
          isStart={isStart}
          keyboardChoice={keyboardChoice}
          setKeyboardChoice={setKeyboardChoice}
          openKeyPositions={openKeyPositions}
          setOpenKeyPositions={setOpenKeyPositions}
          // for the server
          updatedSoundChoices={updatedSoundChoices.current}
          updatedPadsData={updatedPadsData.current}
          // for the instrument choices
          hihats1={hihats1}
          setHihats1={setHihats1}
          hihats2={hihats2}
          setHihats2={setHihats2}
          snares={snares}
          setSnares={setSnares}
          kicks={kicks}
          setKicks={setKicks}
        />
      </section>
    </div>
  );
}
