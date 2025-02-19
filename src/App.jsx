import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AnimalsList from './Pages/AnimalsListing' // Fixed import name
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AnimalDetails from "./Pages/AnimalDetails";
import AddAnimal from './Pages/AddAnimal';
import EditAnimal from './Pages/EditAnimal'
import axios from 'axios'




function App() {

  const [DisplayAnimal, setAnimal] = useState([]);



  return (
    <>
      <h1> Wildlife Vulnerability Tracker</h1>
      <Navbar />
      <div>
        <Routes>
          <Route path="/animalList" element={<AnimalsList callBackDisplayAnimal={DisplayAnimal} callBackSetAnimal={setAnimal} />} ></Route>
          <Route path="/" element={<HomePage callBackDisplayAnimal={DisplayAnimal} />} ></Route>
          <Route path="/animal/:id" element={<AnimalDetails />} />
          <Route path="/addAnimal" element={<AddAnimal />} />
          <Route path="/edit/:id" element={<EditAnimal />} />
        </Routes>
      </div>
    </>
  )
}

export default App
