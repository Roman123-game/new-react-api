import "./Map.css";


function Map(props:any) {
    const {position} = props
    return (  

        <div>
        <div className={`dot ${position}`}>.</div>
        <h1 className="map">&#x1F5FA;</h1>
        </div>


    );
}

export default Map;