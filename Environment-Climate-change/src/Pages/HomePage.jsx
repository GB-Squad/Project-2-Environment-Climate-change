import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../Styles/homepage.css";

function HomePage() {
    return (
        <> 
            <h1> Homepage </h1>
            <MapContainer 
            className='mapContainer'
            center={[48.8566, 2.3522]} 
            zoom={2}>
                <TileLayer
                    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png"

                />

            </MapContainer>

        </>
        )
}

export default HomePage