import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'

function StartGame() {
    const navigate = useNavigate()

    function handleStartGame() {
        socket.once("roomCreated", (key:string)=>{
          navigate("/GameScreen", {state: {roomKey: key}})
        })

        socket.emit("createGame")
    }

  return <button onClick={handleStartGame}>Start Game</button>
}

export default StartGame
