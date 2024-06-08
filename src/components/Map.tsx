import "./Map.css";


function Map(props:any) {
    const {position} = props
    return (  

        <>
         <h1 className="map">&#x1F5FA;</h1>
        <div className={`dot ${position}`}>.</div>
        </>


    );
}

export default Map;