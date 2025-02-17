import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      <h2>{animalDetails.common_name}</h2>
      <img src={animalDetails.image_url} alt={animalDetails.common_name} />
      <p>{animalDetails.conservation_status.iucn_status}</p>
      {/* Display other details here */}
    </div>
  );
}

export default AnimalDetails;
