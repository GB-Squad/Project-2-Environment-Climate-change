import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/EditAnimal.css";

function AddAnimal() {
    const [family, setFamily] = useState("");
    const [species, setSpecies] = useState("");
    const [status, setStatus] = useState("");
    const [year_assessed, setYearAssessed] = useState("");
    const [estimated_population, setEstimatedPopulation] = useState("");
    const [geographical_area, setGeographicalArea] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [image, setImage] = useState("");
    const [life_expectancy, setLifeExpectancy] = useState("");
    const [diet_category, setDietCategory] = useState("");
    const [animal_description, setAnimalDescription] = useState("");
    const [notable_features, setNotableFeatures] = useState("");
    const [size, setSize] = useState("");
    const [reference_links, setReferenceLinks] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for mandatory fields
        if (!family || !status) {
            alert("Family and Status are mandatory fields.");
            return;
        }

        // Format geolocation and geographical_area as arrays
        const geoArray = geolocation.split(",").map(coord => parseFloat(coord.trim()));
        const geoAreaArray = geographical_area.split(",").map(area => area.trim());

        const newSpecies = {
            species,
            family,
            status,
            lastAssessed: year_assessed, // Corrected field name from `year_assessed` to `lastAssessed`
            population: estimated_population,
            regions: geoAreaArray, // Corrected field name for geographical areas
            geolocations: geoArray, // Corrected field name for geolocation
            image,
            life_expectancy,
            diet_category,
            animal_description,
            notable_features,
            size,
            reference_links,
        };

        axios
            .post("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json", newSpecies)
            .then(() => {
                navigate(`/animalList`);
            })
            .catch((e) => {
                console.log("Error posting new species:", e);
            });

        // Reset the form fields after submission
        setFamily("");
        setSpecies("");
        setStatus("");
        setYearAssessed("");
        setEstimatedPopulation("");
        setGeographicalArea("");
        setGeolocation("");
        setImage("");
        setLifeExpectancy("");
        setDietCategory("");
        setAnimalDescription("");
        setNotableFeatures("");
        setSize("");
        setReferenceLinks("");
    };

    return (
        <div className="addAnimalFormContainer">
            <h3>Track new species</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Species:</label>
                    <input
                        type="text"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Family:</label>
                    <select
                        value={family}
                        onChange={(e) => setFamily(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select a family</option>
                        <option value="mammals">mammals</option>
                        <option value="reptiles">reptiles</option>
                        <option value="fish">fish</option>
                        <option value="birds">birds</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select
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
                    <label>Year Assessed:</label>
                    <input
                        type="text"
                        value={year_assessed}
                        onChange={(e) => setYearAssessed(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Estimated Population:</label>
                    <input
                        type="text"
                        value={estimated_population}
                        onChange={(e) => setEstimatedPopulation(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Geographical Area:</label>
                    <input
                        type="text"
                        placeholder="Separate areas with commas"
                        value={geographical_area}
                        onChange={(e) => setGeographicalArea(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Geolocation (lat, long):</label>
                    <input
                        type="text"
                        placeholder="Enter coordinates separated by a comma"
                        value={geolocation}
                        onChange={(e) => setGeolocation(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Life Expectancy:</label>
                    <input
                        type="text"
                        value={life_expectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Diet Category:</label>
                    <input
                        type="text"
                        value={diet_category}
                        onChange={(e) => setDietCategory(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Animal Description:</label>
                    <textarea
                        value={animal_description}
                        onChange={(e) => setAnimalDescription(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Notable Features:</label>
                    <textarea
                        value={notable_features}
                        onChange={(e) => setNotableFeatures(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Size:</label>
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Reference Links:</label>
                    <input
                        type="text"
                        value={reference_links}
                        onChange={(e) => setReferenceLinks(e.target.value)}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn-submit">Add New Species</button>
            </form>
        </div>
    );
}

export default AddAnimal;
