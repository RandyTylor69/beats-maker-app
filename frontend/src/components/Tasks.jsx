export default function Tasks(props) {
  const keyboardOptions = ["bass","piano"]
  const keyboardOptionsMapped = keyboardOptions.map((opt) => {
    return <option>{opt}</option>;
  });
  
  return (
    <section className="tasks-container">
      <div className="form">
        <form className="keyboard-form" onChange={(e)=> props.setKeyboardChoice(e.target.value)}>
          <select>{keyboardOptionsMapped}</select>
        </form>
      </div>
      <div className="rest">
        <form className="slider-form" onSubmit={(e) => props.toggleStart(e)}>
          <button className="big-button" type="submit">
            {props.isStart ? "Pause" : "Start"}
          </button>
          <input
            name="slider"
            type="range"
            min="0"
            max="100"
            value={props.tempo}
            onChange={(e) => props.setTempo(e.target.value)}
            className="slider"
          ></input>
        </form>
        <button className="small-button">Record</button>
        <button className="small-button">My Beats</button>
      </div>
    </section>
  );
}
