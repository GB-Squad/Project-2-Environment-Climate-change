import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Pages/EditAnimal.css";

function EditAnimal() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [animalData, setAnimalData] = useState({
        species: "",
        family: "",
        status: "",
        lastAssessed: "",
        population: "",
        regions: "",
        geolocations: "",
        image: "",
        life_expectancy: "",
        diet_category: "",
        animal_description: "",
        reference: "",
    });

    useEffect(() => {
        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {
                const Edit = Object.keys(response.data).map((id) => ({
                    id,
                    ...response.data[id],
                }));
                const editDetail = Edit.find((editDetail) => editDetail.id === id);
                if (editDetail) {
                    setAnimalData(editDetail);
                }
            })
            .catch((error) => {
                console.error("Error fetching animal details:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setAnimalData({ ...animalData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(
                `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal/${id}.json`,
                animalData
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
                            <option value="">Select a family</option>
                            <option value="Felidae">Felidae</option>
                            <option value="Canidae">Canidae</option>
                            <option value="Cervidae">Cervidae</option>
                            <option value="Ursidae">Ursidae</option>
                            {/* Add more families as needed */}
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
                            {/* Add more status options as needed */}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Last Assessment:</label>
                        <input
                            type="text"
                            name="lastAssessed"
                            value={animalData.lastAssessed}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Population:</label>
                        <input
                            type="number"
                            name="population"
                            placeholder="Enter the number of animals"
                            value={animalData.population}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Regions:</label>
                        <input
                            type="text"
                            name="regions"
                            placeholder="Specify area of living"
                            value={animalData.regions}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Geolocation:</label>
                        <input
                            type="text"
                            name="geolocations"
                            placeholder="Enter geolocation (x, y)"
                            value={animalData.geolocations}
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
                        <label>Life expectancy:</label>
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
                        <label>Diet category:</label>
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
                        <label>Animal description:</label>
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
                        <label>Reference:</label>
                        <input
                            type="text"
                            name="reference"
                            placeholder="Enter reference URL"
                            value={animalData.reference}
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
