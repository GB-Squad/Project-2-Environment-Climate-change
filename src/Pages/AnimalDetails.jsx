import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/AnimalDetail.css"

function AnimalDetails() {
  const { id } = useParams(); 
  const [animalDetails, setAnimalDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://environmentalchanges-5f276-default-rtdb.europe-west1.firebasedatabase.app/animal.json`
      )
      .then((response) => {
        const animalArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        const animal = animalArray.find((animal) => animal.id === id);
        setAnimalDetails(animal);
      })
      .catch((error) => {
        console.error("Error fetching animal details:", error);
      });
  }, [id]);

  if (!animalDetails) return <div>Loading...</div>;

  return (
    <div className="animal-details-container">
     
      <div className="animal-image-banner">
        <img src={animalDetails.image} alt={animalDetails.species} />
      </div>

      
      <div className="animal-info">
        <h2 className="animal-name">{animalDetails.species}</h2>

        <div className="animal-meta">
          <p><strong>Family:</strong> {animalDetails.family}</p>
          <p><strong>Diet Category:</strong> {animalDetails.diet_category}</p>
          <p><strong>Status:</strong> {animalDetails.status}</p>
          <p><strong>Life Expectancy:</strong> {animalDetails.life_expectancy}</p>
          <p><strong>Estimated Population:</strong> {animalDetails.estimated_population}</p>
          <p><strong>Geographical Area:</strong> {animalDetails.geographical_area.join(", ")}</p>
          <p><strong>Geolocation:</strong> {animalDetails.geolocation.join(", ")}</p>
          <p><strong>Year Assessed:</strong> {animalDetails.year_assessed}</p>
        </div>

     
        <div className="animal-description">
          <h3>Description:</h3>
          <p>{animalDetails.animal_description}</p>
        </div>

  
        <div className="animal-links">
          <a href={animalDetails.reference_links} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </div>

        
        <div className="animal-actions">
          <Link to={`/edit/${animalDetails.id}`}>
            <button className="btn">Edit Animal Details</button>
          </Link>
          <Link to="/animalList">
            <button className="btn btn-secondary">Back to Animal List</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetails;
