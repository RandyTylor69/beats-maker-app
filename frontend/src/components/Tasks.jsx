

export default function Tasks(props) {
  return (
    <section className="tasks-container">
      <form className="slider-form" onSubmit={(e) => props.toggleStart(e)}>
        <button 
        className="big-button" 
        type="submit"
        disabled={props.btnAvail? false : true}
        >
          {props.isStart? "Pause" : "Start"}
        
        </button>
        <input
          name="slider"
          type="range"
          min="0"
          max="100"
          value={props.sliderVolume}
          onChange={(e) => props.setSliderVolume(e.target.value)}
          className="slider"
          
        ></input>
      </form>
      <button className="small-button">Record</button>
      <button className="small-button">My Beats</button>
    </section>
  );
}
