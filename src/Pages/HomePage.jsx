import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../Styles/homepage.css";
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


function HomePage(props) {

    const [familyData, setFamilyData] = useState([]);
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        axios.get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
        .then((response) => {
            const animalArr = Object.keys(response.data).map((id) => ({
                id,
                ...response.data[id],
            }));
            props.callBackSetAnimal(animalArr);
            //console.log(animalArr)
            const animalFamilyCount = {};
            const animalStatusCount = {};
            animalArr.forEach((animal) => {
                const family = animal.family || "unknown";
                animalFamilyCount[family] = (animalFamilyCount[family] || 0) + 1;

                const status = animal.status || "unknown";
                animalStatusCount[status] = (animalStatusCount[status] || 0) + 1;
                
                const familyFormattedData = Object.keys(animalFamilyCount).map((family) => ({
                    name: family,
                    value: animalFamilyCount[family],
                }));

                const statusFormattedData = Object.keys(animalStatusCount).map((status) => ({
                    name: status,
                    value: animalStatusCount[status],
                }));

                setFamilyData(familyFormattedData);
                setStatusData(statusFormattedData);
            })
            
     
        })
        .catch(e => (console.log("error get request", e)))
    }, [])

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

    const geoIcon = new Icon({
        iconUrl:"public/icon frog.png",
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
                    <PieChart width={400} height={400}>
                <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
                </section>
                <section className="KPI">
                    <h3>Breakdown per species family</h3>
                    <PieChart width={400} height={400}>
                <Pie
                    data={familyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {familyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
                    
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