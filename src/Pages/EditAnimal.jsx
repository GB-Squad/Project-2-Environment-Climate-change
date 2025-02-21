import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/EditAnimal.css";

function EditAnimal() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [animalData, setAnimalData] = useState({
        species: "",
        family: "",
        status: "",
        year_assessed: "",
        estimated_population: "",
        geographical_area: "",
        geolocation: [],
        image: "",
        life_expectancy: "",
        diet_category: "",
        animal_description: "",
        reference_links: "",
    });

    useEffect(() => {
        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {
                if (response.data) {
                    const animals = Object.entries(response.data).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }));

                    const editDetail = animals.find((animal) => animal.id === id);
                    if (editDetail) {
                        setAnimalData({
                            species: editDetail.species || "",
                            family: editDetail.family || "",
                            status: editDetail.status || "",
                            year_assessed: editDetail.year_assessed || "",
                            estimated_population: editDetail.estimated_population || "",
                            geographical_area: editDetail.geographical_area || "",
                            geolocation: editDetail.geolocation || [],
                            image: editDetail.image || "",
                            life_expectancy: editDetail.life_expectancy || "",
                            diet_category: editDetail.diet_category || "",
                            animal_description: editDetail.animal_description || "",
                            reference_links: editDetail.reference_links || "",
                        });
                    }
                }
            })
            .catch((error) => console.error("Error fetching animal details:", error));
    }, [id]);

    const handleChange = (e) => {
        setAnimalData({ ...animalData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = { ...animalData };

        axios
            .patch(
                `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal/${id}.json`,
                updatedData
            )
            .then(() => navigate("/animalList"))
            .catch((error) => console.error("Error updating data:", error));
    };

    return (
        <>
            <h3>Edit Animal</h3>
            <div className="addAnimalFormContainer">
                <h3>Edit Animal Sheet</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Species:</label>
                        <input
                            type="text"
                            name="species"
                            placeholder="Enter the species name"
                            value={animalData.species}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Family:</label>
                        <select
                            name="family"
                            value={animalData.family}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="Birds">Birds</option>
                            <option value="mammals">Mammals</option>
                            <option value="reptiles">Reptiles</option>
                            <option value="fish">Fish</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={animalData.status}
                            onChange={handleChange}
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
                            name="year_assessed"
                            value={animalData.year_assessed}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Estimated Population:</label>
                        <input
                            type="number"
                            name="estimated_population"
                            value={animalData.estimated_population}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Geographical Area:</label>
                        <input
                            type="text"
                            name="geographical_area"
                            placeholder="Specify area of living"
                            value={animalData.geographical_area}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Geolocation:</label>
                        <input
                            type="text"
                            name="geolocation"
                            placeholder="Enter geolocation (latitude, longitude)"
                            value={animalData.geolocation}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Enter image URL"
                            value={animalData.image}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Life Expectancy:</label>
                        <input
                            type="text"
                            name="life_expectancy"
                            placeholder="Enter wildlife life expectancy"
                            value={animalData.life_expectancy}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Diet Category:</label>
                        <input
                            type="text"
                            name="diet_category"
                            placeholder="Enter species' diet"
                            value={animalData.diet_category}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Animal Description:</label>
                        <input
                            type="text"
                            name="animal_description"
                            placeholder="Enter main characteristics of the species"
                            value={animalData.animal_description}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Reference Links:</label>
                        <input
                            type="text"
                            name="reference_links"
                            placeholder="Enter reference URL"
                            value={animalData.reference_links}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn-submit">Edit Species</button>
                </form>
            </div>
        </>
    );
}

export default EditAnimal;
