import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Pages/EditAnimal.css";

function AddAnimal() {
    const [family, setFamily] = useState("");
    const [species, setSpecies] = useState("");
    const [status, setStatus] = useState("");
    const [lastAssessed, setLastAssessed] = useState("");
    const [population, setPopulation] = useState(0);
    const [regions, setRegions] = useState("");
    const [geolocations, setGeolocations] = useState([]);
    const [image, setImage] = useState("");
    const [life_expectancy, setLife_expectancy] = useState("");
    const [diet_category, setDiet_category] = useState("");
    const [animal_description, setAnimal_description] = useState("");
    const [reference, setReference] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!family || !status) {
            alert("Family and Status are mandatory fields.");
            return;
        }

        const newSpecies = {
            family,
            species,
            status,
            lastAssessed,
            population,
            regions,
            geolocations,
            image,
            life_expectancy,
            diet_category,
            animal_description,
            reference,
        };

        axios
            .post("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json", newSpecies)
            .then((response) => {
                navigate(`/animalList`);
            })
            .catch((e) => {
                console.log("Error posting new species:", e);
            });

        setFamily("");
        setSpecies("");
        setStatus("");
        setLastAssessed("");
        setPopulation(0);
        setRegions("");
        setGeolocations("");
        setImage("");
        setLife_expectancy("");
        setDiet_category("");
        setAnimal_description("");
        setReference("");
    };

    return (
        <div className="addAnimalFormContainer">
            <h3>Track new species</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Species:</label>
                    <input
                        type="text"
                        name="species"
                        placeholder="Enter the species name"
                        value={species}
                        onChange={(e) => { setSpecies(e.target.value) }}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Family:</label>
                    <select
                        name="family"
                        value={family}
                        onChange={(e) => setFamily(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select a family</option>
                        <option value="mammals">mammals</option>
                        <option value="reptiles">reptiles</option>
                        <option value="fish">fish</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select a status</option>
                        <option value="Critically Endangered (CR)">Critically Endangered</option>
                        <option value="Endangered (EN)">Endangered</option>
                        <option value="Vulnerable">Vulnerable</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Last Assessment:</label>
                    <input
                        type="text"
                        name="lastAssessed"
                        value={lastAssessed}
                        onChange={(e) => { setLastAssessed(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Population:</label>
                    <input
                        type="number"
                        name="population"
                        placeholder="Enter the number of animals"
                        value={population}
                        onChange={(e) => { setPopulation(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Regions:</label>
                    <input
                        type="text"
                        name="regions"
                        placeholder="Specify area of living"
                        value={regions}
                        onChange={(e) => { setRegions(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Geolocation:</label>
                    <input
                        type="text"
                        name="geolocations"
                        placeholder="Enter geolocation (x, y)"
                        value={geolocations}
                        onChange={(e) => { setGeolocations(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Life expectancy:</label>
                    <input
                        type="text"
                        name="life_expectancy"
                        placeholder="Enter wildlife life expectancy"
                        value={life_expectancy}
                        onChange={(e) => { setLife_expectancy(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Diet category:</label>
                    <input
                        type="text"
                        name="diet_category"
                        placeholder="Enter species' diet"
                        value={diet_category}
                        onChange={(e) => { setDiet_category(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Animal description:</label>
                    <input
                        type="text"
                        name="animal_description"
                        placeholder="Enter main characteristics of the species"
                        value={animal_description}
                        onChange={(e) => { setAnimal_description(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Reference:</label>
                    <input
                        type="text"
                        name="reference"
                        placeholder="Enter reference URL"
                        value={reference}
                        onChange={(e) => { setReference(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn-submit">Add New Species</button>
            </form>
        </div>
    );
}

export default AddAnimal;
