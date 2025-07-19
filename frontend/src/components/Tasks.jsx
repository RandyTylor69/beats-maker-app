import SavingWindow from "./SavingWindow";
import SampleBeats from "./SampleBeats";
import React from "react";
export default function Tasks(props) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDisplayingSample, setIsDisplayingSample] = React.useState(false);

  // 2. Accessing all beats.
  return (
    <>
      <section className="tasks-container">
        <button
          className="small-button"
          onClick={() => setIsDisplayingSample((prev) => !prev)}
        >
          Sample Beats
        </button>
        <button
          className="small-button"
          onClick={() => setIsSaving((prev) => !prev)}
        >
          Save Beat CHANGE LATER
        </button>
        <form className="slider-form" onSubmit={(e) => props.toggleStart(e)}>
          <input
            title="change the speed"
            name="slider"
            type="range"
            min="0"
            max="100"
            value={props.tempo}
            onChange={(e) => props.setTempo(e.target.value)}
            className="slider"
          ></input>
          <button className="big-button" type="submit">
            {props.isStart ? "Pause" : "Start"}
          </button>
        </form>
      </section>

      {isSaving && (
        <SavingWindow
          soundChoices={props.updatedSoundChoices}
          padsData={props.updatedPadsData}
        />
      )}
      {isDisplayingSample && (
        <SampleBeats
          padsData={props.padsData}
          setPadsData={props.setPadsData}
          soundChoices={props.soundChoices}
          setSoundChoices={props.setSoundChoices}
          setIsDisplayingSample={setIsDisplayingSample}
          updatedSoundChoices = {props.updatedSoundChoices}
          // for the instrument choices
          hihats1={props.hihats1}
          setHihats1={props.setHihats1}
          hihats2={props.hihats2}
          setHihats2={props.setHihats2}
          snares={props.snares}
          setSnares={props.setSnares}
          kicks={props.kicks}
          setKicks={props.setKicks}
        />
      )}
    </>
  );
}
