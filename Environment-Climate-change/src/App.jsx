import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AnimalsList from './Pages/AnimalsListing' // Fixed import name
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AnimalDetails from "./Pages/AnimalDetails";
import AddAnimal from './Pages/AddAnimal'


function App() {

  const [DisplayAnimal, setAnimal] = useState([]);

  return (
    <>
      <h1> Wildlife Vulnerability Tracker</h1>
      <Navbar />
      <div>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/animalList" element={<AnimalsList callBackDisplayAnimal={DisplayAnimal} />} ></Route>

          <Route path="/animal/:id" element={<AnimalDetails />} />git 
=======
          
          <Route path="/animalList" element={<AnimalsList callBackDisplayAnimal={DisplayAnimal} callBackSetAnimal={setAnimal} />} ></Route>
          <Route path="/" element={<HomePage callBackDisplayAnimal={DisplayAnimal}/>} ></Route>
          <Route path="/animal/:id" element={<AnimalDetails />} />
>>>>>>> bf255efcc2b402405b3bf2813b770a3c2c038678
          <Route path="/addAnimal" element={<AddAnimal />} />
        </Routes>
      </div>
    </>
  )
}

export default App
