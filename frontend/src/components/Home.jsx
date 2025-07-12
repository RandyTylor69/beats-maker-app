import Pads from "./Pads";
import Tasks from "./Tasks";
import React from "react";
import { pads } from "../data";

export default function Home() {
  // vars for Tasks.jsx
  const [isStart, setIsStart] = React.useState(false);
  const [tempo, setTempo] = React.useState(60);
  const [soundChoices, setSoundChoices] = React.useState({
    hihat: "hihat-open",
    snare: "snare-acoustic",
    kick: "kick-clear"
  })

  // vars for Pads.jssx
  const [padsData, setPadsData] = React.useState(pads);
  const interval = React.useRef(null);
  const timeouts = React.useRef([]);

  // --- FUNCTIONS FOR TASKS.JSX

  function toggleStart(e) {
    e.preventDefault();

    // 1. grabbing the Tempo (deafault at 30)
    const formData = tempo;

    // 2. change "start" to "pause" or vise versa
    setIsStart((prev) => !prev);
  }

  // Since no real music producer will use this app,
  // the tempo shown here is purely imaginative. 

  // Since each pad represents a beat, the tempo (BPM) represents
  // how fast the app can play 8 beat in a minute.
  // A slider value of 0  -> 90 BPM  (1 beat / sec)
  // A slider value of 50 -> 150 BPM (2 beat / sec)
  // A slider value of 100-> 210 BPM (3 beat / sec)
  
  
  const bpm = (tempo/100*120 + 90); 
  const delay = 60000 / bpm 

  function makeSound(pad){
    const sound = new Audio(`/sounds/${soundChoices[pad.type]}.wav`)
    sound.play()
  }

  

  function activate(pad) {
    // 1. enlarge the pad
    setPadsData((prev) =>
      prev.map((item) => {
        return item.id === pad.id ? { ...item, scale: 1.2 } : item;
      })
    );

    // 2. make sound

    if(pad.on) makeSound(pad)
    // 3. reduce the pad (after a while)
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
      // second function call (looped with delay)
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
        <Pads 
        padsData={padsData} 
        setPadsData={setPadsData} 
        isStart={isStart}
        soundChoices = {soundChoices}
        setSoundChoices = {setSoundChoices}
         />
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
