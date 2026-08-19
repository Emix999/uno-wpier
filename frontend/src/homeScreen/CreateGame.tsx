import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'

function StartGame() {
    const navigate = useNavigate()

    function handleStartGame() {
        socket.once("roomCreated", (key:string)=>{
          navigate("/LobbyScreen", {state: {roomKey: key}})
        })

        socket.emit("createGame")
    }

  return <button onClick={handleStartGame}>Create Game</button>
}

export default StartGame
