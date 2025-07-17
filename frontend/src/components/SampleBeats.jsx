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
  function applySample(soundChoices, padsData) {
    props.setSoundChoices(soundChoices);
    props.setPadsData(padsData);
    // close the window 
    props.setIsDisplayingSample(prev=>!prev)
  }

  const samplesMapped = samples.map((sample, id) => (
    <div
      className="sample"
      key={id}
      onClick={() => applySample(sample.soundChoices, sample.padsData)
        
      }
    >
      {sample.name}
    </div>
  ));
  return (
    <div className="sample-container">
      <div className="sample-header">
        <button onClick={()=>props.setIsDisplayingSample(prev=>!prev)}>&#x2715;</button>
      </div>
      {samples.length != 0 ? samplesMapped : <h2 className="sample-loading-text">Loading...</h2>}
    </div>
  );
}
