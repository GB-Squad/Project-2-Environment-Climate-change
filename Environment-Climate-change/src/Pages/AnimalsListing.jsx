import React, { useEffect, useState } from "react";
import axios from "axios";

function AnimalsList() {
    const [DisplayAnimal, setAnimal] = useState([]);


    useEffect(() => {

        axios
            .get("https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json")
            .then((response) => {

                const animalArray = Object.values(response.data).flat();
                setAnimal(animalArray);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    return (
        <div>
            {DisplayAnimal.map((animal) => (
                <div key={animal.id}>
                    <h3>Class:{animal.class}</h3>
                </div>
            ))}



        </div>
    );
}

export default AnimalsList;
