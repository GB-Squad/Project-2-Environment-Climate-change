import { useState } from 'react';
import './App.css';
import './index.css'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AnimalsList from './Pages/AnimalsListing';
import HomePage from './Pages/HomePage';
import { Routes, Route, Link } from 'react-router-dom';
import AnimalDetails from "./Pages/AnimalDetails";
import AddAnimal from './Pages/AddAnimal';
import EditAnimal from './Pages/EditAnimal';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayAnimal, setAnimal] = useState([]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div id="header-container">
        <Link to="/">
      <img id="logo" src='/icon-frog.png'></img>
        </Link>
      <h1>Wildlife Watcher</h1>
      </div>
      <h3>A collaborative tool for tracking species conservation statuses</h3>
      
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Routes>
        <Route
          path="/animalList"
          element={<AnimalsList searchTerm={searchTerm} callBackDisplayAnimal={displayAnimal} callBackSetAnimal={setAnimal} />}
        />
        <Route
          path="/"
          element={<HomePage callBackDisplayAnimal={displayAnimal} callBackSetAnimal={setAnimal} />}
        />
        <Route path="/animal/:id" element={<AnimalDetails />} />
        <Route path="/addAnimal" element={<AddAnimal />} />
        <Route path="/edit/:id" element={<EditAnimal />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
