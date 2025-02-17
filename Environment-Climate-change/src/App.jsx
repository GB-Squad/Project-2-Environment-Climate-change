import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AnimalsList from './Pages/AnimalsListing' // Fixed import name
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1> Wildlife Vulnerability Tracker</h1>
      <Navbar />
      <div>
        <Routes>
        <Route path="/" element= {<HomePage/>} ></Route> 
        <Route path="/animalList" element= {<AnimalsList/>} ></Route> 
        </Routes>
      </div>
    </>
  )
}

export default App
