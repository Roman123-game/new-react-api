import "./Map.css";

function Map(props:any) {
    const {position} = props
    return (
        <>
         <h1 className="map">&#128506;</h1>
        <div  title={position} className={`dot ${position}`}>&#x1F789;</div>
        </>
    );
}

export default Map;