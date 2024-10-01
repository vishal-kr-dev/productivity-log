import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom'
import TimerComponent from './components/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TimerComponent/>
    </>
  )
}

export default App
