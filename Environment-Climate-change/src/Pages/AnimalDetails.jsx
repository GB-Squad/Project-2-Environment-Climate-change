import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

function AnimalDetails() {
  const { id } = useParams();  // Get the animal ID from the URL
  const [animalDetails, setAnimalDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json`
      )
      .then((response) => {
        // Flatten the data and then find the animal by its id
        const animalArray = Object.values(response.data).flat();
        const animal = animalArray.find((animal) => animal.id === parseInt(id));
        setAnimalDetails(animal);
      })
      .catch((error) => {
        console.error('Error fetching animal details:', error);
      });
  }, [id]);

  if (!animalDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{animalDetails.name}</h2>
      <img src={animalDetails.image} alt={animalDetails.name} />
      <p>{animalDetails.status}</p>
      <Link to={`/editAnimal/${animalDetails.id}`} className="btn btn-outline-secondary">
        Edit animal sheet
      </Link>
      <Link to="/animalList">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default AnimalDetails;
