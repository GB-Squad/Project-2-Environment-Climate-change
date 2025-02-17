import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AnimalsList from './Components/AnimalsListing' // Fixed import name

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div>
        <AnimalsList />
        <h1> Animals Vulnerability Mapping</h1>
      </div>
    </>
  )
}

export default App
