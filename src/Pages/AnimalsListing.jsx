import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Pages/AnimalsList.css";

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
                            <div>
                                <p><strong>Population:</strong> {animal.estimated_population}</p>
                                <p><strong>Region(s):</strong> {animal.geographical_area}</p>
                                <p><strong>Life Expectancy:</strong> {animal.life_expectancy}</p>
                            </div>
                            <Link to={`/animal/${animal.id}`} className="btn btn-outline-secondary">
                                Animal Details
                            </Link>
                            <div>
                                <button onClick={() => {
                                     if (window.confirm("Are you sure you want to delete this element?")) {
                                        
                                    handleDelete(animal.id)}
                                    }}>
                                        Delete
                                        </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No animals found matching the search criteria</p>
                )}
            </div>
        </>
    );
}

export default AnimalsList;
