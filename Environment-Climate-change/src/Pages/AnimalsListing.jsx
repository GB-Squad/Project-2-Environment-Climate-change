import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/AnimalsList.css"

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
        <>

            <div class="container text-center">
                <div class="row">
                    <div class="col-12 col-md-4">one</div>
                    <div class="col-12 col-md-4">two</div>
                    <div class="col-12 col-md-4">theww</div>
                    <div class="col-12 col-md-4">four</div>
                    <div class="col-12 col-md-4">five</div>
                    <div class="col-12 col-md-4">six</div>
                    <div class="col-12 col-md-4">seven</div>

                </div>
            </div>

            <div className="items-list">
                {DisplayAnimal.map((animal) => (
                    <div className="item" key={animal.id}>
                        <img className="img-display" src={animal.image_url} alt="animal image" />
                        <h3>Common Name:{animal.common_name}</h3>
                        <h3>Status : {animal.conservation_status.iucn_status}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AnimalsList;
