import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/AnimalsList.css"
import { Link } from "react-router-dom";

function AnimalsList() {
    const [DisplayAnimal, setAnimal] = useState([]);


    useEffect(() => {

        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {

                const animalArray = Object.values(response.data).flat();
                setAnimal(animalArray);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); return (<>
        <div className="items-list">
            {DisplayAnimal.map((animal) => (
                <div className="item" key={animal.id}>
                    <img className="img-display" src={animal.image_url} alt="animal image" />
                    <h4><strong>Common Name:</strong>{animal.common_name}</h4>
                    <h3>Status : {animal.conservation_status.iucn_status}</h3>
                    <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                        Animal Details
                    </Link>
                </div>
            ))}
        </div>
    </>
    );
}

export default AnimalsList;
