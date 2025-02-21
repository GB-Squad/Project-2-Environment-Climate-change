import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/EditAnimal.css";

const AddAnimal = () => {
    const [species, setSpecies] = useState("");
    const [family, setFamily] = useState("");
    const [status, setStatus] = useState("");
    const [year_assessed, setYearAssessed] = useState("");
    const [estimated_population, setEstimatedPopulation] = useState("");
    const [geographical_area, setGeographicalArea] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [image, setImage] = useState("");
    const [life_expectancy, setLifeExpectancy] = useState("");
    const [diet_category, setDietCategory] = useState("");
    const [animal_description, setAnimalDescription] = useState("");
    const [reference_links, setReferenceLinks] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpecies = {
            species,
            family,
            status,
            year_assessed,
            estimated_population,
            geographical_area,
            geolocation,
            image,
            life_expectancy,
            diet_category,
            animal_description,
            reference_links,
        };

        axios
            .post(
                "https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json",
                newSpecies
            )
            .then((response) => {
                const generatedId = response.data.name;
                axios.patch(
                    `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal/${generatedId}.json`,
                    { id: generatedId }
                );
                navigate(`/animalList`);
            })
            .catch((e) => {
                console.log("Error posting new species:", e);
            });

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
        setReferenceLinks("");
    };

    return (
        <div className="addAnimalFormContainer">
            <h3>Enter information and log a new species!</h3>
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
                        <select value={family} onChange={(e) => setFamily(e.target.value)} required>
                            <option value="">Select Family</option>
                            <option value="mammals">mammals</option>
                            <option value="fish">fish</option>
                            <option value="Birds">Birds</option>
                            <option value="reptiles">reptiles</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="">Select Status</option>

                            <option value="Critically Endangered">Critically Endangered</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Vulnerable">Vulnerable</option>

                            \
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={year_assessed}
                            onChange={(e) => setYearAssessed(e.target.value)}
                            placeholder="Year Assessed"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={estimated_population}
                            onChange={(e) => setEstimatedPopulation(e.target.value)}
                            placeholder="Estimated Population"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={geographical_area}
                            onChange={(e) => setGeographicalArea(e.target.value)}
                            placeholder="Geographical Area"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={geolocation}
                            onChange={(e) => setGeolocation(e.target.value)}
                            placeholder="Geolocation"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={life_expectancy}
                            onChange={(e) => setLifeExpectancy(e.target.value)}
                            placeholder="Life Expectancy"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={diet_category}
                            onChange={(e) => setDietCategory(e.target.value)}
                            placeholder="Diet Category"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={animal_description}
                            onChange={(e) => setAnimalDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={reference_links}
                            onChange={(e) => setReferenceLinks(e.target.value)}
                            placeholder="Reference Links"
                            required
                        />
                    </div>
                    <button type="submit">Add Animal</button>
                </form>
            </div>
        </>
    );
};

export default AddAnimal;
