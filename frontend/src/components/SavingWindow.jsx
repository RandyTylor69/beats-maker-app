import React from "react";
export default function SavingWindow(props) {
  const [name, setName] = React.useState("");
  async function saveBeat(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/archive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        soundChoices: props.soundChoices,
        padsData: props.padsData,
        name: name,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error saving beat: " + data.message);
      return;
    }
    alert(data.message);
    window.location.reload();
  } 

  return (
    <div className="savingWindow">
      <form onSubmit={saveBeat}>
        <input onChange={(e) => setName(e.target.value)}></input>
        <button type="submit"></button>
      </form>
    </div>
  );
}
