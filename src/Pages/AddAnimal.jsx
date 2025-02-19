import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/addAnimal.css";

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

        // Create the new animal object
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

        // Make the POST request to save the new species
        axios
            .post("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json", newSpecies)
            .then((response) => {
                // Redirect to the animal list after successful submission
                navigate(`/animalList`);
            })
            .catch((e) => {
                console.log("Error posting new species:", e);
            });

        // Clear the form fields after submitting
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
                <label>
                    Species:
                    <input
                        type="text"
                        name="species"
                        placeholder="enter the species name"
                        value={species}
                        onChange={(e) => { setSpecies(e.target.value) }}
                    />
                </label>
                <label>
                    Family:
                    <input
                        type="text"
                        name="family"
                        placeholder="enter the family's species"
                        value={family}
                        onChange={(e) => { setFamily(e.target.value) }}
                    />
                </label>

                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        placeholder="enter the species' vulnerability status"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                    />
                </label>
                <label>
                    Last Assessment:
                    <input
                        type="date"
                        name="lastAssessed"
                        placeholder="enter the date of the last status assessment"
                        value={lastAssessed}
                        onChange={(e) => { setLastAssessed(e.target.value) }}
                    />
                </label>
                <label>
                    Population:
                    <input
                        type="number"
                        name="population"
                        placeholder="enter the number of animals"
                        value={population}
                        onChange={(e) => { setPopulation(e.target.value) }}
                    />
                </label>
                <label>
                    Regions:
                    <input
                        type="text"
                        name="regions"
                        placeholder="specify area of living"
                        value={regions}
                        onChange={(e) => { setRegions(e.target.value) }}
                    />
                </label>
                <label>
                    Geolocation:
                    <input
                        type="text"
                        name="geolocations"
                        placeholder="enter the geolocation (x, y)"
                        value={geolocations}
                        onChange={(e) => { setGeolocations(e.target.value) }}
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="text"
                        name="image"
                        placeholder="enter image URL"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                </label>
                <label>
                    Life expectancy:
                    <input
                        type="text"
                        name="life_expectancy"
                        placeholder="enter the wild life expectancy"
                        value={life_expectancy}
                        onChange={(e) => { setLife_expectancy(e.target.value) }}
                    />
                </label>
                <label>
                    Diet category:
                    <input
                        type="text"
                        name="diet_category"
                        placeholder="enter the species' diet"
                        value={diet_category}
                        onChange={(e) => { setDiet_category(e.target.value) }}
                    />
                </label>
                <label>
                    Animal description:
                    <input
                        type="text"
                        name="animal_description"
                        placeholder="enter main characteristics of the species"
                        value={animal_description}
                        onChange={(e) => { setAnimal_description(e.target.value) }}
                    />
                </label>
                <label>
                    Reference:
                    <input
                        type="text"
                        name="reference"
                        placeholder="enter reference URL"
                        value={reference}
                        onChange={(e) => { setReference(e.target.value) }}
                    />
                </label>
                <button type="submit">Add new species</button>
            </form>
        </div>
    );
}

export default AddAnimal;
