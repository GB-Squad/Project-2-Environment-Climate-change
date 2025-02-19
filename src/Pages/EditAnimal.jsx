import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/addAnimal.css";

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
                    <label>
                        Species:
                        <input
                            type="text"
                            name="species"
                            placeholder="Enter the species name"
                            value={animalData.species}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Family:
                        <input
                            type="text"
                            name="family"
                            placeholder="Enter the family's species"
                            value={animalData.family}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            placeholder="Enter the species' vulnerability status"
                            value={animalData.status}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Assessment:
                        <input
                            type="date"
                            name="lastAssessed"
                            value={animalData.lastAssessed}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Population:
                        <input
                            type="number"
                            name="population"
                            placeholder="Enter the number of animals"
                            value={animalData.population}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Regions:
                        <input
                            type="text"
                            name="regions"
                            placeholder="Specify area of living"
                            value={animalData.regions}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Geolocation:
                        <input
                            type="text"
                            name="geolocations"
                            placeholder="Enter the geolocation (x, y)"
                            value={animalData.geolocations}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Image:
                        <input
                            type="text"
                            name="image"
                            placeholder="Enter image URL"
                            value={animalData.image}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Life expectancy:
                        <input
                            type="text"
                            name="life_expectancy"
                            placeholder="Enter the wildlife expectancy"
                            value={animalData.life_expectancy}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Diet category:
                        <input
                            type="text"
                            name="diet_category"
                            placeholder="Enter the species' diet"
                            value={animalData.diet_category}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Animal description:
                        <input
                            type="text"
                            name="animal_description"
                            placeholder="Enter main characteristics of the species"
                            value={animalData.animal_description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Reference:
                        <input
                            type="text"
                            name="reference"
                            placeholder="Enter reference URL"
                            value={animalData.reference}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Edit Species</button>
                </form>
            </div>
        </>
    );
}

export default EditAnimal;
