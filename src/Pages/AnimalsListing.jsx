import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/AnimalsList.css";
import { Link } from "react-router-dom";

function AnimalsList({ searchTerm, callBackDisplayAnimal, callBackSetAnimal }) {
    const [entries, setEntries] = useState([]);

    const filteredEntries = entries.filter((animal) =>
        animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {
                if (response.data) {
                    const animalArray = Object.keys(response.data).map((id) => ({
                        id,
                        ...response.data[id],
                    }));
                    setEntries(animalArray);
                    callBackSetAnimal(animalArray);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal/${id}.json`)
            .then(() => {
                const updatedEntries = entries.filter((animal) => animal.id !== id);
                setEntries(updatedEntries);
                callBackSetAnimal(updatedEntries);
            })
            .catch((error) => {
                console.error("Error deleting animal:", error);
            });
    };

    return (
        <>
            <div className="items-list">
                {filteredEntries.length > 0 ? (
                    filteredEntries.map((animal) => (
                        <div className="item" key={animal.id}>
                            <img className="img-display" src={animal.image} alt="animal" />
                            <h4>Name: {animal.species}</h4>
                            <h4>{animal.status}</h4>
                            <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                                Animal Details
                            </Link>
                            <div>
                                <button onClick={() => handleDelete(animal.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No animals found matching the search criteria</p>
                )}
                {entries.map((animal) => (
                    <div className="item" key={animal.id}>
                        <img className="img-display" src={animal.image} alt="animal" />
                        <h4>Name: {animal.species}</h4>
                        <h4>{animal.status}</h4>
                        <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                            Animal Details
                        </Link>
                        <div>
                            <button className="btn btn-outline-secondary" onClick={() => {
                                if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
                                    handleDelete(animal.id);
                                }
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AnimalsList;
