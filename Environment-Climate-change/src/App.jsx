import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AnimalsList from './Pages/AnimalsListing' // Fixed import name
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AnimalDetails from "./Pages/AnimalDetails";
import AddAnimal from './Pages/AddAnimal'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1> Wildlife Vulnerability Tracker</h1>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/animalList" element={<AnimalsList />} ></Route>
<<<<<<< HEAD
          <Route path="/animal/:id" element={<AnimalDetails />} />
=======
          <Route path="/animal/:id" component={AnimalDetails} />
          <Route path="/addAnimal" element={<AddAnimal/>} />
>>>>>>> 980e41e8679a80fe69afd10f73ff46cefaf48429
        </Routes>
      </div>
    </>
  )
}

export default App
