export default function Tasks(props) {
  return (
    <section className="tasks-container">
      <button className="small-button">Record</button>
      <button className="small-button">My Beats</button>
      <form className="slider-form" onSubmit={(e) => props.toggleStart(e)}>
        <input
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
  );
}
