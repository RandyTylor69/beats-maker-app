import { useEffect } from "react";

export default function Keyboard() {
  function a() {
    const sound = new Audio(`/keyboard-sounds/a1.wav`);
    sound.play();
  }
  function as() {
    const sound = new Audio(`/keyboard-sounds/a1s.wav`);
    sound.play();
  }
  function b() {
    const sound = new Audio(`/keyboard-sounds/b1.wav`);
    sound.play();
  }
  function c() {
    const sound = new Audio(`/keyboard-sounds/c1.wav`);
    sound.play();
  }
  function cs() {
    const sound = new Audio(`/keyboard-sounds/c1s.wav`);
    sound.play();
  }
  function d() {
    const sound = new Audio(`/keyboard-sounds/d1.wav`);
    sound.play();
  }
  function ds() {
    const sound = new Audio(`/keyboard-sounds/d1s.wav`);
    sound.play();
  }
  function e() {
    const sound = new Audio(`/keyboard-sounds/e1.wav`);
    sound.play();
  }
  function f() {
    const sound = new Audio(`/keyboard-sounds/f1.wav`);
    sound.play();
  }
  function fs() {
    const sound = new Audio(`/keyboard-sounds/f1s.wav`);
    sound.play();
  }
  function g() {
    const sound = new Audio(`/keyboard-sounds/g1.wav`);
    sound.play();
  }
  function gs() {
    const sound = new Audio(`/keyboard-sounds/g1s.wav`);
    sound.play();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
    function handleKey(ev) {
      if (ev.key === "a") c();
      else if (ev.key === "w") cs();
      else if (ev.key === "s") d();
      else if (ev.key === "e") ds();
      else if (ev.key === "d") e();
      else if (ev.key === "f") f();
      else if (ev.key === "t") fs();
      else if (ev.key === "g") g();
      else if (ev.key === "y") gs();
      else if (ev.key === "h") a();
      else if (ev.key === "j") as();
      else if (ev.key === "u") b();
    }
  });
  return (
    <div className="keyboard-container">
      <div className="white-key-container">
        <button className="white-key" onClick={c}></button>
        <button className="white-key" onClick={d}></button>
        <button className="white-key" onClick={e}></button>
        <button className="white-key" onClick={f}></button>
        <button className="white-key" onClick={g}></button>
        <button className="white-key" onClick={a}></button>
        <button className="white-key" onClick={b}></button>
      </div>
      <div className="black-key-container1">
        <button className="black-key" onClick={cs}></button>
        <button className="black-key" onClick={ds}></button>
      </div>
      <div className="black-key-container2">
        <button className="black-key" onClick={fs}></button>
        <button className="black-key" onClick={gs}></button>
        <button className="black-key" onClick={as}></button>
      </div>
    </div>
  );
}
