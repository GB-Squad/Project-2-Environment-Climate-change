import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../Styles/homepage.css";
import { Icon } from 'leaflet';

function HomePage(props) {
    const geocodeTest = [13.036272, 10.963980];
    const geoIcon = new Icon({
        iconUrl:"src/assets/icon frog.png",
        iconSize: [38, 38]
    })
        
    return (
        <> 
            <div className="KPI-container">
                <section className="KPI">
                    <h3>Number of tracked species: {props.callBackDisplayAnimal.length}</h3>
                </section>
                <section className="KPI">
                    <h3>Breakdown per level of vulnerability</h3>
                </section>
                <section className="KPI">
                    <h3>Breakdown per species family</h3>
                </section>
            </div>
            
            <MapContainer 
            className='map-container'
            center={[13.036272, 10.963980]} 
            zoom={2}
            minZoom={2}
            maxZoom={6}
            >
           
            <TileLayer
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png?api_key=5ba27eab-7c1e-480a-b202-79dc8eb15c1a"
            />
            
            <Marker 
                position={geocodeTest}
                icon={geoIcon}>
                
                <Popup><button>Hello I'm a popup</button></Popup>
            </Marker>

            </MapContainer>

        </>
        )
}

export default HomePage