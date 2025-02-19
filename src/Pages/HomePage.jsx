import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../Styles/homepage.css";
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage(props) {


    useEffect(() => {
        axios.get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {
                const animalArr = Object.keys(response.data).map((id) => ({
                    id,
                    ...response.data[id],
                }));
                props.callBackSetAnimal(animalArr)
                console.log(animalArr)
            })
            .catch(e => (console.log("error get request", e)))
    }, [])

    const geoIcon = new Icon({
        iconUrl: "src/assets/icon frog.png",
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
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=5ba27eab-7c1e-480a-b202-79dc8eb15c1a"
                />
                {props.callBackDisplayAnimal
                    .filter(animal => animal.geolocation && animal.geolocation.length === 2)
                    .map((animal) => {
                        const [lat, lng] = animal.geolocation
                        return (
                            <Marker
                                key={animal.id}
                                position={[lat, lng]}
                                icon={geoIcon}>

                                <Popup>
                                    <p>{animal.species}</p>
                                    <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                                        More details
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })}


            </MapContainer>

        </>
    )
}

export default HomePage