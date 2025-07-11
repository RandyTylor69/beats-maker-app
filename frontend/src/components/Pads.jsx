import Pad from "./Pad";

export default function Pads(props) {
  // turns on / off the pads
  function toggle(id) {
    props.setPadsData((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      )
    );
  }

  const padsMapped = props.padsData.map((pad) => {
    return (
      <Pad
        key={pad.id}
        on={pad.on}
        color={pad.color}
        id={pad.id}
        type={pad.type}
        scale={pad.scale}
        toggle={toggle}
        activate={props.activate}
      />
    );
  });

  return (
    <section className="pad-area">
      {/** drop-down menus */}
      <div className="pads-description">
        <div className="dropdown-wrapper">
          <select name="hihat">
            <option value="1">hihat-1</option>
            <option value="2">hihat-2</option>
            <option value="3">hihat-3</option>
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="snare">
            <option value="1">snare-1</option>
            <option value="2">snare-2</option>
            <option value="3">snare-3</option>
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="kick">
            <option value="1">kick-1</option>
            <option value="2">kick-2</option>
            <option value="3">kick-3</option>
          </select>
        </div>
      </div>
      {/** actual pads */}
      <div className="pads-container">{padsMapped}</div>
    </section>
  );
}
