import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomeScreen from './homeScreen/HomeScreen'
import GameScreen from './game/GameScreen'
import LobbyScreen from './game/LobbyScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/LobbyScreen" element={<LobbyScreen />} />
      <Route path="/GameScreen" element={<GameScreen />} />
    </Routes>
  )
}

export default App
