import { useEffect, useRef } from "react";

export default function Keyboard() {
  const keySounds = useRef({}) // intentionally left empty

  // The keySounds object will be populated with new Audio objects
  // when the app is opened, and each keyboard-press will play that
  // existing Audio object, avoiding creating a new one upon every
  // re-render. Apparently, a browser limits the amount of Audio
  // objects you can have, depending on how many files it can load
  // without timing out due to too many requests. (According to SO)

  // Populating the keySounds object.
  useEffect(()=>{
    keySounds.current["a"] = new Audio("/keyboard-sounds/a1.wav")
    keySounds.current["as"] = new Audio("/keyboard-sounds/a1s.wav")
    keySounds.current["b"] = new Audio("/keyboard-sounds/b1.wav")
    keySounds.current["c"] = new Audio("/keyboard-sounds/c1.wav")
    keySounds.current["cs"] = new Audio("/keyboard-sounds/c1s.wav")
    keySounds.current["d"] = new Audio("/keyboard-sounds/d1.wav")
    keySounds.current["ds"] = new Audio("/keyboard-sounds/d1s.wav")
    keySounds.current["e"] = new Audio("/keyboard-sounds/e1.wav")
    keySounds.current["f"] = new Audio("/keyboard-sounds/f1.wav")
    keySounds.current["fs"] = new Audio("/keyboard-sounds/f1s.wav")
    keySounds.current["g"] = new Audio("/keyboard-sounds/g1.wav")
    keySounds.current["gs"] = new Audio("/keyboard-sounds/g1s.wav")
  }, [])

  function playKey(key){
    const sound = keySounds.current[key]
    sound.play()
  }
  
  return (
    <div className="keyboard-container">
      <div className="white-key-container">
        <button className="white-key" onClick={()=>playKey("c")}></button>
        <button className="white-key" onClick={()=>playKey("d")}></button>
        <button className="white-key" onClick={()=>playKey("e")}></button>
        <button className="white-key" onClick={()=>playKey("f")}></button>
        <button className="white-key" onClick={()=>playKey("g")}></button>
        <button className="white-key" onClick={()=>playKey("a")}></button>
        <button className="white-key" onClick={()=>playKey("b")}></button>
      </div>
      <div className="black-key-container1">
        <button className="black-key" onClick={()=>playKey("cs")}></button>
        <button className="black-key" onClick={()=>playKey("ds")}></button>
      </div>
      <div className="black-key-container2">
        <button className="black-key" onClick={()=>playKey("fs")}></button>
        <button className="black-key" onClick={()=>playKey("gs")}></button>
        <button className="black-key" onClick={()=>playKey("as")}></button>
      </div>
    </div>
  );
}
