import Pad from "./Pad";
import React from "react";
export default function Pads(props) {
  const [hihats, setHihats] = React.useState([
    { label: "hihat-closed", value: "hihat-closed", type: "hihat" },
    { label: "hihat-open", value: "hihat-open", type: "hihat" },
    { label: "hihat-accent", value: "hihat-accent", type: "hihat" },
    { label: "hihat-chick", value: "hihat-chick", type: "hihat" },
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

  // Moving the desired sound object (within each instrument array) up
  // to the front whenever the soundChoices object is modified. This
  // solves the problem of the backend modifiying the soundChoices object
  // without syncing with frontend.

  const soundChoices = props.updatedSoundChoices.current;

  function shiftSoundHelper(arr, setArr, sound) {
    // saving the target sound to a variable
    const target = arr.find((item) => item.value === sound);

    // removing the target sound from its position
    const targetIndex = arr.indexOf(target);

    setArr((prev) => {
      prev.splice(targetIndex, 1);
      return prev;
    });

    setArr((prev) => [target, ...prev]);
  }

  React.useEffect(() => {
    shiftSoundHelper(hihats, setHihats, soundChoices.hihat);
    shiftSoundHelper(snares, setSnares, soundChoices.snare);
    shiftSoundHelper(kicks, setKicks, soundChoices.kick);
  }, [soundChoices]);

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
      />
    );
  });

  const hihatsMapped = hihats.map((hihat, id) => {
    return (
      <option value={hihat.value} key={id}>
        {hihat.label}
      </option>
    );
  });

  const snaresMapped = snares.map((snare, id) => {
    return (
      <option value={snare.value} key={id}>
        {snare.label}
      </option>
    );
  });

  const kicksMapped = kicks.map((kick, id) => {
    return (
      <option value={kick.value} key={id}>
        {kick.label}
      </option>
    );
  });

  function submitSound(e) {
    e.preventDefault();
    const sound = e.target.value;

    if (sound.includes("hihat")) {
      props.setSoundChoices((prev) => ({ ...prev, hihat: sound }));
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
          <select name="hihat">{hihatsMapped}</select>
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
  );
}
