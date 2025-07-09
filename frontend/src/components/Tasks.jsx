import React from "react"
import { Link } from "react-router-dom"

export default function Tasks(){
    const [sliderVolume, setSliderVolume] = React.useState(30)
    return(
        <section className="tasks-container">
            <h1>Start</h1>
            <div className="slider-container">
                <input
                 type="range" 
                 min="0"
                 max="100"
                 value={sliderVolume}
                 onChange={(e)=>setSliderVolume(e.target.value)}
                className="slider"
                 >
                </input>
            </div>
            <h3>Record</h3>
            <h3>My Beats</h3>
        </section>
    )
}