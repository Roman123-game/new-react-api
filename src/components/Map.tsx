import "./Map.css";


function Map(props:any) {
    const {position} = props
    return (  


        <div className={`dot ${{position}}`}>.
        
        <h1 className="map">&#x1F5FA;</h1>
        </div>



    );
}

export default Map;