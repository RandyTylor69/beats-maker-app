import React from "react"
import { Link } from "react-router-dom"

export default function Tasks(){
    const [sliderVolume, setSliderVolume] = React.useState(30)
    function handleSubmit(e){
        
    }
    return(
        <section className="tasks-container"> 
            <form className="slider-form">
                <button 
                    className="big-button"
                    type="submit"
                >Start</button>
                <input
                 type="range" 
                 min="0"
                 max="100"
                 value={sliderVolume}
                 onChange={(e)=>setSliderVolume(e.target.value)}
                className="slider"
                onSubmit={(e)=>handleSubmit()}
                 >
                </input>
            </form>
            <button className="small-button">Record</button>
            <button className="small-button">My Beats</button>
        </section>
    )
}