import Pads from "./Pads";
import Tasks from "./Tasks";
import React from "react";
import { pads } from "../data";

export default function Home() {
  // vars for Tasks.jsx
  const [isStart, setIsStart] = React.useState(false);
  const [sliderVolume, setSliderVolume] = React.useState(30);
  const [btnAvail, setBtnAvail] = React.useState(true)

  // vars for Pads.jssx
  const [padsData, setPadsData] = React.useState(pads);
  const [loop, setLoop] = React.useState(null);

  // --- FUNCTIONS FOR PADS.JSX
  function activate(pad) {
    // deciding the delay before making a sound, based on the pad's position (pad.id)
    var timeout = 250; // 2000 milSec / 8 columns = 250 milsec / column
    if ([1, 9, 17].includes(pad.id)) {
      timeout *= 0; // column 1
    } else if ([2, 10, 18].includes(pad.id)) {
      timeout *= 1; // column 2
    } else if ([3, 11, 19].includes(pad.id)) {
      timeout *= 2; // column 3
    } else if ([4, 12, 20].includes(pad.id)) {
      timeout *= 3; // column 4
    } else if ([5, 13, 21].includes(pad.id)) {
      timeout *= 4; // column 5
    } else if ([6, 14, 22].includes(pad.id)) {
      timeout *= 5; // column 6
    } else if ([7, 15, 23].includes(pad.id)) {
      timeout *= 6; // column 7
    } else if ([8, 16, 24].includes(pad.id)) {
      timeout *= 7; // column 8
    }

    setTimeout(() => {
      // pop in size
      setPadsData((prev) =>
        prev.map((item) =>
          item.id === pad.id ? { ...item, scale: 1.2 } : item
        )
      );

      //make a sound
      if (pad.on) {
        console.log(pad.id);
      }

      // return back to size
      setTimeout(() => {
        setPadsData((prev) =>
          prev.map((item) =>
            item.id === pad.id ? { ...item, scale: 1 } : item
          )
        );
      }, 240);
    }, timeout);
  }

  // --- FUNCTIONS FOR TASKS.JSX

  function toggleStart(e) {
    e.preventDefault();

    // grabbing the volume (deafault at 30)
    const formData = sliderVolume;

    // change "start" to "pause" or vise versa
    setIsStart((prev) => !prev);

    // the button will be disabled until the loop is finished.
    // loop finish = all pads' scales are 1
    setBtnAvail(false)
    setTimeout(()=>{
      setBtnAvail(true)
    }, 2000)

 
  }

  React.useEffect(() => {
    // isStart => music starting
    if (!isStart) {
      clearInterval(loop);
      return;
    }
    const interval = () => {
      for (let i of padsData) {
        activate(i);
      }
    };
    setLoop(interval());
    setLoop(setInterval(interval, 2000));
  }, [isStart]);

  return (
    <div className="web-body">
      <section className="action-area">
        <Pads
          activate={activate}
          padsData={padsData}
          setPadsData={setPadsData}
          isStart={isStart}
        />
      </section>
      <section className="task-area">
        <Tasks
          padsData={padsData}
          toggleStart={toggleStart}
          sliderVolume={sliderVolume}
          setSliderVolume={setSliderVolume}
          isStart={isStart}
          btnAvail={btnAvail}
        />
      </section>
    </div>
  );
}
