import { useEffect, useRef, useState } from "react";

export default function Keyboard(props) {
  const keySounds = useRef({}); // intentionally left empty

  // The keySounds object will be populated with new Audio objects
  // when the app is opened, and each keyboard-press will play that
  // existing Audio object, avoiding creating a new one upon every
  // re-render. Apparently, a browser limits the amount of Audio
  // objects you can have, depending on how many files it can load
  // without timing out due to too many requests. (According to SO)
  const keyboardChoice = props.keyboardChoice;

  console.log(keyboardChoice);
  // Populating the keySounds object.
  useEffect(() => {
    keySounds.current["a1"] = new Audio(`${keyboardChoice}-notes/a1.wav`);
    keySounds.current["a1s"] = new Audio(`${keyboardChoice}-notes/a1s.wav`);
    keySounds.current["b1"] = new Audio(`${keyboardChoice}-notes/b1.wav`);
    keySounds.current["c1"] = new Audio(`${keyboardChoice}-notes/c1.wav`);
    keySounds.current["c1s"] = new Audio(`${keyboardChoice}-notes/c1s.wav`);
    keySounds.current["d0"] = new Audio(`${keyboardChoice}-notes/d0.wav`);
    keySounds.current["d0s"] = new Audio(`${keyboardChoice}-notes/d0s.wav`);
    keySounds.current["d1"] = new Audio(`${keyboardChoice}-notes/d1.wav`);
    keySounds.current["d1s"] = new Audio(`${keyboardChoice}-notes/d1s.wav`);
    keySounds.current["e0"] = new Audio(`${keyboardChoice}-notes/e0.wav`);
    keySounds.current["e1"] = new Audio(`${keyboardChoice}-notes/e1.wav`);
    keySounds.current["f0"] = new Audio(`${keyboardChoice}-notes/f0.wav`);
    keySounds.current["f0s"] = new Audio(`${keyboardChoice}-notes/f0s.wav`);
    keySounds.current["f1"] = new Audio(`${keyboardChoice}-notes/f1.wav`);
    keySounds.current["f1s"] = new Audio(`${keyboardChoice}-notes/f1s.wav`);
    keySounds.current["g0"] = new Audio(`${keyboardChoice}-notes/g0.wav`);
    keySounds.current["g0s"] = new Audio(`${keyboardChoice}-notes/g0s.wav`);
    keySounds.current["g1"] = new Audio(`${keyboardChoice}-notes/g1.wav`);
    keySounds.current["g1s"] = new Audio(`${keyboardChoice}-notes/g1s.wav`);
    keySounds.current["a2"] = new Audio(`${keyboardChoice}-notes/a2.wav`);
    keySounds.current["a2s"] = new Audio(`${keyboardChoice}-notes/a2s.wav`);
    keySounds.current["b2"] = new Audio(`${keyboardChoice}-notes/b2.wav`);
  }, [keyboardChoice]);

  function playKey(key) {
    const sound = keySounds.current[key];
    sound.currentTime = 0;
    sound.play();
  }

  // a2, a2s, b2
  return (
    <div className="keyboard-container">
      <section className="keyboard">
        <div className="white-key-container">
          <button className="white-key" onClick={() => playKey("f0")}></button>
          <button className="white-key" onClick={() => playKey("g0")}></button>
          <button className="white-key" onClick={() => playKey("a1")}></button>
          <button className="white-key" onClick={() => playKey("b1")}></button>
          <button className="white-key" onClick={() => playKey("c1")}></button>
          <button className="white-key" onClick={() => playKey("d1")}></button>
          <button className="white-key" onClick={() => playKey("e1")}></button>
          <button className="white-key" onClick={() => playKey("f1")}></button>
          <button className="white-key" onClick={() => playKey("g1")}></button>
          <button className="white-key" onClick={() => playKey("a2")}></button>
          <button className="white-key" onClick={() => playKey("b2")}></button>
        </div>
        <div className="black-key-container">
          <div className="black-key-container1">
            <button
              className="black-key"
              onClick={() => playKey("f0s")}
            ></button>
            <button
              className="black-key"
              onClick={() => playKey("g0s")}
            ></button>
            <button
              className="black-key"
              onClick={() => playKey("a1s")}
            ></button>
          </div>
          <div className="black-key-container2">
            <button
              className="black-key"
              onClick={() => playKey("c1s")}
            ></button>
            <button
              className="black-key"
              onClick={() => playKey("d1s")}
            ></button>
          </div>
          <div className="black-key-container3">
            <button
              className="black-key"
              onClick={() => playKey("f1s")}
            ></button>
            <button
              className="black-key"
              onClick={() => playKey("g1s")}
            ></button>
            <button
              className="black-key"
              onClick={() => playKey("a2s")}
            ></button>
          </div>
        </div>
      </section>
    </div>
  );
}
