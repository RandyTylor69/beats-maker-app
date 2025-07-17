export default function Tasks(props) {
  // 1. Saving the beat.
  // We're sending "soundChoices" and "padsData" to the server.

  async function saveBeat() {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        soundChoices: props.updatedSoundChoices,
        padsData: props.updatedPadsData,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error saving beat: " + data.message);
      return;
    }
    console.log(data);
  }

  // 2. Accessing all beats.
  return (
    <section className="tasks-container">
      <button className="small-button" onClick={saveBeat}>
        Save New
      </button>
      <button className="small-button">My Beats</button>
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
  );
}
