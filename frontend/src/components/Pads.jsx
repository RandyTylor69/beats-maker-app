import Pad from "./Pad";
import React from "react";
export default function Pads(props) {
  // the activation function is in Home
  const padsMapped = props.padsData.map((pad) => {
    return (
      <Pad
        key={pad.id}
        on={pad.on}
        color={pad.color}
        id={pad.id}
        type={pad.type}
        scale={pad.scale}
        activate={props.activate}
        setPadsData={props.setPadsData}
        makeSound = {()=>props.makeSound(pad)}
      />
    );
  });

  const hihats1Mapped = props.hihats1.map((hihat1, id) => {
    return (
      <option value={hihat1.value} key={id}>
        {hihat1.label}
      </option>
    );
  });

  const hihats2Mapped = props.hihats2.map((hihat2, id) => {
    return (
      <option value={hihat2.value} key={id}>
        {hihat2.label}
      </option>
    );
  });

  const snaresMapped = props.snares.map((snare, id) => {
    return (
      <option value={snare.value} key={id}>
        {snare.label}
      </option>
    );
  });

  const kicksMapped = props.kicks.map((kick, id) => {
    return (
      <option value={kick.value} key={id}>
        {kick.label}
      </option>
    );
  });
  
  // pads description 
  function submitSound(e) {
    e.preventDefault();
    const sound = e.target.value;

    if (sound.includes("hihat1")) {
      props.setSoundChoices((prev) => ({ ...prev, hihat1: sound }));
    } else if (sound.includes("hihat2")) {
      props.setSoundChoices((prev) => ({ ...prev, hihat2: sound }));
    } else if (sound.includes("snare")) {
      props.setSoundChoices((prev) => ({ ...prev, snare: sound }));
    } else if (sound.includes("kick")) {
      props.setSoundChoices((prev) => ({ ...prev, kick: sound }));
    }
  }


  return (
    <section className="pad-area">
      {/** drop-down menus */}
      <form onChange={submitSound} className="pads-description">
        <div className="dropdown-wrapper">
          <select name="hihat1">{hihats1Mapped}</select>
        </div>
        <div className="dropdown-wrapper">
          <select name="hihat2">{hihats2Mapped}</select>
        </div>
        <div className="dropdown-wrapper">
          <select name="snare">{snaresMapped}</select>
        </div>
        <div className="dropdown-wrapper">
          <select name="kick">{kicksMapped}</select>
        </div>
      </form>
      {/** actual pads */}
      <div className="pads-container">{padsMapped}</div>
    </section>
    // HERE
  );
}
