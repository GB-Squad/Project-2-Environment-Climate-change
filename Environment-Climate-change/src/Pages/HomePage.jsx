import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

function HomePage() {
    return (
        <> 
            <h1> Homepage </h1>
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                <TileLayer
                    attribution= '&copy; <a href="www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}tile.openstreetmap.org/{z}/{x}//{y}.png"
                />

            </MapContainer>

        </>
        )
}

export default HomePage