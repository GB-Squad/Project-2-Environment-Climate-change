import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <div>
        <h1> Animals Vulnerability Mapping</h1>
      </div>
    </>
  )
}

export default App
