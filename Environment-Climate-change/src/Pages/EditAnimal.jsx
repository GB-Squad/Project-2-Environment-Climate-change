import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../Styles/addAnimal.css"


function EditAnimal () {
    const { id } = useParams();

    const navigate = useNavigate();

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

    useEffect (() => {
        axios.get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json/")
        .then((response) => {
            // Flatten the data and then find the animal by its id
            const animalArray = Object.values(response.data).flat();
            const animal = animalArray.find((animal) => animal.id === parseInt(id));
            console.log(animal)
            setFamily(animal.family);
            setSpecies(animal.species);
            setStatus(animal.status);
            setLastAssessed(animal.lastAssessed);
            setPopulation(animal.population);
            setRegions(animal.regions);
            setGeolocations(animal.geolocations);
            setLife_expectancy(animal.life_expectancy);
            setDiet_category(animal.diet_category);
            setAnimal_description(animal.animal_description);
            setReference(animal.reference);
          })
        .catch(e => {console.log("error", e)})
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDetails = {
            family: family,
            species: species,
            status: status,
            lastAssessed: lastAssessed,
            population: population,
            regions: regions,
            geolocations: geolocations,
            image: image,
            life_expectancy: life_expectancy,
            diet_category: diet_category,
            animal_description: animal_description,
            reference: reference
        }
        
        axios.put("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json", newDetails)
        .then((response) => {
            navigate("/animalList")
        })
        .catch(e => {
            console.log("error", e)
        })

    return (
        <div className="addAnimalFormContainer"> 
        <h3> edit animal sheet </h3>
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
            <button type="submit">edit species</button>
        </form>
    </div>
    )
}

}

export default EditAnimal