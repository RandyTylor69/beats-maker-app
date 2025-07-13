import Pad from "./Pad";
import React from "react";
export default function Pads(props) {
  const hihats = [
    { label: "hihat-open", value: "hihat-open", type: "hihat" },
    { label: "hihat-accent", value: "hihat-accent", type: "hihat" },
    { label: "hihat-chick", value: "hihat-chick", type: "hihat" },
    { label: "hihat-closed", value: "hihat-closed", type: "hihat" },
  ];
  const snares = [
    { label: "snare-acoustic", value: "snare-acoustic", type: "snare" },
    { label: "snare-power", value: "snare-power", type: "snare" },
    { label: "snare-rim", value: "snare-rim", type: "snare" },
    { label: "snare-rock", value: "snare-rock", type: "snare" },
  ];
  const kicks = [
    { label: "kick-clear", value: "kick-clear", type: "kick" },
    { label: "kick-house", value: "kick-house", type: "kick" },
    { label: "kick-rifle", value: "kick-rifle", type: "kick" },
    { label: "kick-synth", value: "kick-synth", type: "kick" },
    { label: "kick-swedish", value: "kick-swedish", type: "kick" },
  ];
  // turns on / off the pads
  function toggle(id) {
    props.setPadsData((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      )
    );
  }

  const padsMapped = props.padsData.map((pad) => {
    return (
      <Pad
        key={pad.id}
        on={pad.on}
        color={pad.color}
        id={pad.id}
        type={pad.type}
        scale={pad.scale}
        toggle={toggle}
        activate={props.activate}
      />
    );
  });

  const hihatsMapped = hihats.map((hihat) => {
    return <option value={hihat.value}>{hihat.label}</option>;
  });

  const snaresMapped = snares.map((snare) => {
    return <option value={snare.value}>{snare.label}</option>;
  });

  const kicksMapped = kicks.map((kick) => {
    return <option value={kick.value}>{kick.label}</option>;
  });

  function submitSound(e){
    e.preventDefault()
    const sound = e.target.value

    if(sound.includes("hihat")){
      props.setSoundChoices(prev=>({...prev, hihat: sound}))
    } else if (sound.includes("snare")) {
      props.setSoundChoices(prev=>({...prev, snare: sound}))
    } else if (sound.includes("kick")) {
      props.setSoundChoices(prev=>({...prev, kick: sound}))
    }
  }

  return (
    <section className="pad-area">
      {/** drop-down menus */}
      <form  onChange={submitSound} className="pads-description">
        <div className="dropdown-wrapper">
          <select name="hihat">
            {hihatsMapped}
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="snare">
            {snaresMapped}
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="kick">
            {kicksMapped}
          </select>
        </div>
      </form>
      {/** actual pads */}
      <div className="pads-container">{padsMapped}</div>
    </section>
  );
}
