import SavingWindow from "./SavingWindow";
import SampleBeats from "./SampleBeats";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faTrash,
  faDownload,
  faUpload,
  faVial,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

// The layout of all utilities of the Tasks.jsx component
// is found after this export function.

export default function Tasks(props) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDisplayingSample, setIsDisplayingSample] = React.useState(false);
  // SAVE button: the next 3 lines are for downloading pads data in JSON format
  const jsonPads = JSON.stringify({
    padsData: props.updatedPadsData,
    soundChoices: props.updatedSoundChoices,
  });
  const blob = new Blob([jsonPads], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  // OPEN button: storing json file.
  const inputRef = React.useRef(null);
  const [files, setFiles] = React.useState(null);

  function openFile() {
    inputRef.current.click();
    // inputRef.current is simply the input JSX component.
  }
  function shiftSoundHelper(arr, setArr, sound) {
    // saving the target sound to a variable
    const target = arr.find((item) => item.value === sound);

    // removing the target sound from its position
    const targetIndex = arr.indexOf(target);
    setArr((prev) => {
      prev.splice(targetIndex, 1);
      return prev;
    });

    // adding the target sound to the front of the array.
    setArr((prev) => [target, ...prev]);
  }

  function applySample(soundChoices, padsData) {
    props.setSoundChoices(soundChoices);
    props.setPadsData(padsData);

    shiftSoundHelper(props.hihats1, props.setHihats1, soundChoices.hihat1);
    shiftSoundHelper(props.hihats2, props.setHihats2, soundChoices.hihat2);
    shiftSoundHelper(props.snares, props.setSnares, soundChoices.snare);
    shiftSoundHelper(props.kicks, props.setKicks, soundChoices.kick);
  }

  function handleChange(e) {
    // parses the JSON file (obtained from input) into readable array
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e) => {
      const nonJSONResult = JSON.parse(e.target.result)
      applySample(nonJSONResult.soundChoices, nonJSONResult.padsData)

    };
  }

  function togglePiano() {
    props.setIsDisplayingPiano((prev) => !prev);
  }

  function cleanAll() {
    props.setPadsData((prev) =>
      prev.map((pad) => {
        return { ...pad, on: false };
      })
    );
  }

  // 2. Accessing all beats.
  return (
    <>
      <section className="tasks-container">
        {/* ___________________ GROUP 1 _____________________**/}
        <div className="task-group-1">
          <form className="group-1-form">
            <FontAwesomeIcon icon={faVolumeHigh} />
            <input
              title="change the speed"
              name="slider"
              type="range"
              min="-100"
              max="200"
              defaultValue={props.masterVolume.current}
              onChange={(e) =>
                props.setMasterVolume(parseFloat(e.target.value))
              }
              className="slider"
            />
          </form>
          <form className="group-1-form">
            <p>Tempo</p>
            <input
              className="tempo-input"
              name="tempoInput"
              type="number"
              defaultValue={props.tempo.current}
              onChange={(e) =>
                (props.tempo.current = parseFloat(e.target.value))
              }
            />
          </form>
          <button className="small-button" onClick={togglePiano}>
            Display Piano
          </button>
        </div>
        {/* ___________________ GROUP 2 _____________________**/}
        <div className="task-group-2">
          <button
            className="small-button"
            onClick={() => setIsDisplayingSample((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faVial} />
            Samples
          </button>
          <div className="group-2-save-open-container">
            <a
              className="small-button"
              href={url}
              download="sequencer-arragment.json"
            >
              <FontAwesomeIcon icon={faDownload} />
              Save
            </a>
            <a className="small-button" onClick={openFile}>
              <FontAwesomeIcon icon={faUpload} />
              Open
            </a>
            <input
              type="file"
              ref={inputRef}
              onChange={handleChange}
              className="upload-file-input"
            />
          </div>

          <button className="small-button" onClick={cleanAll}>
            <FontAwesomeIcon icon={faTrash} />
            Clean
          </button>
        </div>
        {/* ___________________ GROUP 3 _____________________**/}
        <div className="task-group-3">
          <button className="big-button" onClick={props.toggleStart}>
            {props.isStart ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
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
          updatedSoundChoices={props.updatedSoundChoices}
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

// Utilities Layout

// -----O-- master volume     |     Sample Beats   |
//     [60] tempo             |     Save / Open    |       START
//     [X]  show piano        |         Clean      |

// SAVE NEW SAMPLE TO DB BUTTON (COPY PASTE DIRECTLY TO JSX PORTION)

/*         <button
          className="small-button"
          onClick={() => setIsSaving((prev) => !prev)}
        >
          Save Beat CHANGE LATER
        </button>                                            */
