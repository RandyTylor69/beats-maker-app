
export default function Pad(props){
    const styles = {
        backgroundColor: props.color,
        scale:props.scale,
        opacity: props.on? 1:0.1
    }


    return(
        <button 
            className="pad" 
            style={styles}
            onClick={()=>props.toggle(props.id)}
            
        />
            
       
    )
}