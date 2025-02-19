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
        `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json`)
      .then((response) => {
        const animalArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        const animal = animalArray.find((animal) => animal.id === id); 
        setAnimalDetails(animal);
      })
      .catch((error) => {
        console.error('Error fetching animal details:', error);
      });
  }, [id]);

  if (!animalDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{animalDetails.species}</h2>  {/* Corrected to access species */}
      <img src={animalDetails.image} alt={animalDetails.species} />
      <p>{animalDetails.status}</p>
      <Link to={`/edit/${animalDetails.id}`} className="btn btn-outline-secondary">
        Edit animal sheet
      </Link>
      <Link to="/animalList">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default AnimalDetails;
