import { useEffect, useRef, useState } from "react";

export default function Keyboard(props) {
  const keyboardOptions = ["bass", "piano"];
  const keySounds = useRef({}); // intentionally left empty
  const keyNotes = [
    "f0",
    "f0s",
    "g0",
    "g0s",
    "a1",
    "a1s",
    "b1",
    "c1",
    "c1s",
    "d1",
    "d1s",
    "e1",
    "f1",
    "f1s",
    "g1",
    "g1s",
    "a2",
    "a2s",
    "b2",
  ];
  // The keySounds object will be populated with new Audio objects
  // when the app is opened, and each keyboard-press will play that
  // existing Audio object, avoiding creating a new one upon every
  // re-render. Apparently, a browser limits the amount of Audio
  // objects you can have, depending on how many files it can load
  // without timing out due to too many requests. (According to SO)
  // Populating the keySounds object.
  useEffect(() => {
    for (let key of keyNotes) {
      keySounds.current[key] = new Audio(
        `${props.keyboardChoice}-notes/${key}.wav`
      );
    }
  }, [props.keyboardChoice]);

  // detect key press if the user wishes to play the keyboard by using the keyboard.
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // getting the key being pressed
      const key = e.key;

      // white keys:
      if (key === "q") playKey("f0");
      else if (key === "w") playKey("g0");
      else if (key === "e") playKey("a1");
      else if (key === "r") playKey("b1");
      else if (key === "t") playKey("c1");
      else if (key === "y") playKey("d1");
      else if (key === "u") playKey("e1");
      else if (key === "i") playKey("f1");
      else if (key === "o") playKey("g1");
      else if (key === "p") playKey("a2");
      else if (key === "[") playKey("b2");

      // black keys:
      else if (key==="2") playKey("f0s");
      else if (key==="3") playKey("g0s");
      else if (key==="4") playKey("a1s");
      else if (key==="6") playKey("c1s");
      else if (key==="7") playKey("d1s");
      else if (key==="9") playKey("f1s");
      else if (key==="0") playKey("g1s");
      else if (key==="-") playKey("a2s");
      
    });
  }, []);

  function playKey(key) {
    const sound = keySounds.current[key];
    sound.currentTime = 0;
    sound.play();
  }

  // for the key sound options

  const keyboardOptionsMapped = keyboardOptions.map((opt, id) => {
    return <option className="dropdown-option" key={id}>{opt}</option>;
  });

  function submitDropdown(e) {
    props.setKeyboardChoice(e.target.value);
  }


  // a2, a2s, b2
  return (
    <div className="keyboard-container">
      <form className="keyboard-form" onChange={(e) => submitDropdown(e)}>
        <select>{keyboardOptionsMapped}</select>
      </form>

      <section className="keyboard">
        <div className="white-key-container">
          <button className="white-key" onClick={() => playKey("f0")}>
            {props.openKeyPositions && <p>Q</p>}
          </button>
          <button className="white-key" onClick={() => playKey("g0")}>
            {props.openKeyPositions && <p>W</p>}
          </button>
          <button className="white-key" onClick={() => playKey("a1")}>
            {props.openKeyPositions && <p>E</p>}
          </button>
          <button className="white-key" onClick={() => playKey("b1")}>
            {props.openKeyPositions && <p>R</p>}
          </button>
          <button className="white-key" onClick={() => playKey("c1")}>
            {props.openKeyPositions && <p>T</p>}
          </button>
          <button className="white-key" onClick={() => playKey("d1")}>
            {props.openKeyPositions && <p>Y</p>}
          </button>
          <button className="white-key" onClick={() => playKey("e1")}>
            {props.openKeyPositions && <p>U</p>}
          </button>
          <button className="white-key" onClick={() => playKey("f1")}>
            {props.openKeyPositions && <p>I</p>}
          </button>
          <button className="white-key" onClick={() => playKey("g1")}>
            {props.openKeyPositions && <p>O</p>}
          </button>
          <button className="white-key" onClick={() => playKey("a2")}>
            {props.openKeyPositions && <p>P</p>}
          </button>
          <button className="white-key" onClick={() => playKey("b2")}>
            {props.openKeyPositions && <p>{`[`}</p>}
          </button>
        </div>
        <div className="black-key-container">
          <div className="black-key-container1">
            <button className="black-key" onClick={() => playKey("f0s")}>
              {props.openKeyPositions && <p>2</p>}
            </button>
            <button className="black-key" onClick={() => playKey("g0s")}>
              {props.openKeyPositions && <p>3</p>}
            </button>
            <button className="black-key" onClick={() => playKey("a1s")}>
              {props.openKeyPositions && <p>4</p>}
            </button>
          </div>
          <div className="black-key-container2">
            <button className="black-key" onClick={() => playKey("c1s")}>
              {props.openKeyPositions && <p>6</p>}
            </button>
            <button className="black-key" onClick={() => playKey("d1s")}>
              {props.openKeyPositions && <p>7</p>}
            </button>
          </div>
          <div className="black-key-container3">
            <button className="black-key" onClick={() => playKey("f1s")}>
              {props.openKeyPositions && <p>9</p>}
            </button>
            <button className="black-key" onClick={() => playKey("g1s")}>
              {props.openKeyPositions && <p>0</p>}
            </button>
            <button className="black-key" onClick={() => playKey("a2s")}>
              {props.openKeyPositions && <p>-</p>}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
