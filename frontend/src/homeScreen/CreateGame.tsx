import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'

function CreateGame(props: { name:string }) {
    const navigate = useNavigate()


    function handleCreateGame() {
        socket.once("roomCreated", (key:string, playerList:string[])=>{
          navigate("/LobbyScreen", {state: {roomKey: key, playerList: playerList}})
        })

        socket.emit("createGame", props.name)
    }

  return <button onClick={handleCreateGame}>Create Game</button>
}

export default CreateGame
