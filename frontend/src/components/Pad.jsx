export default function Pad(props) {
  const styles = {
    backgroundColor: props.color,
    scale: props.scale,
    opacity: props.on ? 1 : 0.1,
  };

  function padOnClick() {
    // turn on / off pad visual
    props.setPadsData((prevArray) =>
      prevArray.map((item) =>
        item.id === props.id ? { ...item, on: !item.on } : item
      )
    );
    // play example sound only when clicked (no play when cancel pad)
    if(!props.on)  props.makeSound()
  
  }

  return <button 
    className="pad" 
    style={styles} 
    onClick={padOnClick} 
  />;
}
