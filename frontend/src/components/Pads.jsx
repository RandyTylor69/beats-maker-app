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
          <select name="hat">
            <option value="1">hat-1</option>
            <option value="2">hat-2</option>
            <option value="3">hat-3</option>
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="bass">
            <option value="1">bass-1</option>
            <option value="2">bass-2</option>
            <option value="3">bass-3</option>
          </select>
        </div>
        <div className="dropdown-wrapper">
          <select name="drum">
            <option value="1">drum-1</option>
            <option value="2">drum-2</option>
            <option value="3">drum-3</option>
          </select>
        </div>
      </div>
      {/** actual pads */}
      <div className="pads-container">{padsMapped}</div>
    </section>
  );
}
