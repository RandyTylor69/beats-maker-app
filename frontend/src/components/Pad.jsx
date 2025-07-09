
export default function Pad(props){
    const styles = {
        backgroundColor: props.on? props.color:"white"
    }

    return(
        <button 
            className="pad" 
            style={styles}
            onClick={()=>props.toggle(props.id)}
        />
            
       
    )
}