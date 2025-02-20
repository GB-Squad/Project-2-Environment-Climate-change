import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../Styles/homepage.css";
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


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
                setStatusData(statusFormattedData)
                                       
                   
                })
            })   
        
        .catch(e => (console.log("error get request", e)))
    }, [])


    function defineIcon (animal) {
                let iconUrl;
                if (animal.family === "mammals") {
                    iconUrl = "./mammals.png";
                  } else if (animal.family === "Birds") {
                    iconUrl = "./birds.png";
                  } else if (animal.family === "reptiles") {
                    iconUrl = "./reptiles.png";
                  }
                  else if (animal.family === "fish") {
                    iconUrl = "./fish.png";
                  }
                  else { iconUrl = "/icon-frog.png"}

                  return new Icon({
                    iconSize: [38, 38],         
                    iconUrl:iconUrl,
                    });
                }

    const familyCOLORS = ["#B39EB5", "#82ca9d", "#7BAFD4", "#C4BAAC", "#8dd1e1"];
    const statusCOLORS = ["#FFA07A", "#ffc658", "#F4D44D", "#ff8042", "#8dd1e1"];

   

    
        

    return (
        <>
            <div className="KPI-container">
                <section className="KPI">
                    <h3>Tracked species: </h3>
                    <h1>{props.callBackDisplayAnimal.length}</h1>
                </section>
                <section className="chart-KPI">
                    <h3>Breakdown per conservation status</h3>
                    <ResponsiveContainer width="100%" height={400}>
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
                        <Cell key={`cell-${index}`} fill={statusCOLORS[index % statusCOLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
                </section>
                <section className="chart-KPI">
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
                        <Cell key={`cell-${index}`} fill={familyCOLORS[index % familyCOLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
                    
                </section>
               
            </div>
            <h3>Find species directly on the map</h3>
            <MapContainer
                className='map-container'
                center={[13.036272, 10.963980]}
                zoom={2}
                minZoom={2}
                maxZoom={6}
            >

                <TileLayer
                    attribution='&copy; <p>Stadia Maps</p>'
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
                                icon={defineIcon(animal)}>

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