import React from "react";
export default function SampleBeats(props) {
  const [samples, setSamples] = React.useState([]);
  React.useEffect(() => {
    // grabbing all samples and store into "samples" state
    async function getSamples() {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/archive`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      }
      setSamples(data.beats);
    }
    getSamples();
  }, []);

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

  function applySample(soundChoices, padsData) {
    props.setSoundChoices(soundChoices);
    props.setPadsData(padsData);

    shiftSoundHelper(props.hihats1, props.setHihats1, props.updatedSoundChoices.hihat1)
    shiftSoundHelper(props.hihats2, props.setHihats2, props.updatedSoundChoices.hihat2)
    shiftSoundHelper(props.snares, props.setSnares, props.updatedSoundChoices.snare)
    shiftSoundHelper(props.kicks, props.setKick, props.updatedSoundChoices.kick)

    // close the window
    props.setIsDisplayingSample((prev) => !prev);
  }

  // modiying the dropdown menus

  const samplesMapped = samples.map((sample, id) => (
    <div
      className="sample"
      key={id}
      onClick={() => applySample(sample.soundChoices, sample.padsData)}
    >
      {sample.name}
    </div>
  ));
  return (
    <div className="sample-container">
      <div className="sample-header">
        <button onClick={() => props.setIsDisplayingSample((prev) => !prev)}>
          &#x2715;
        </button>
      </div>
      {samples.length != 0 ? (
        samplesMapped
      ) : (
        <h2 className="sample-loading-text">Loading...</h2>
      )}
    </div>
  );
}
