import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/AnimalsList.css"
import { Link } from "react-router-dom";

function AnimalsList(props) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {
                const animalArray = Object.values(response.data).flat();
                setEntries(animalArray);
                props.callBackSetAnimal(animalArray);
                console.log(animalArray);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal/${id}.json`)
            .then(() => {
                console.log(`Animal with id ${id} deleted successfully`);
                const filteredEntries = entries.filter((animal) => animal.id !== id);
                setEntries(filteredEntries);
                props.callBackSetAnimal(filteredEntries);
            })
            .catch((error) => {
                console.error("Error deleting animal:", error);
            });
    };

    return (
        <>
            <div className="items-list">
                {entries.map((animal) => (
                    <div className="item" key={animal.id}>
                        <img className="img-display" src={animal.image} alt="animal image" />
                        <h4> Name:{animal.species}</h4>
                        <h4>{animal.status}</h4>
                        <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                            Animal Details
                        </Link>
                        <button onClick={() => handleDelete(animal.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AnimalsList;
