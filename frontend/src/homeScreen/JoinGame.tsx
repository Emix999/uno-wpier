import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import { useState } from 'react'

function JoinGame() {
    const navigate = useNavigate()

    const [key, setKey] = useState<string>()

    function handleJoinGame() {
        socket.once("roomJoined", (key:string)=>{
          navigate("/LobbyScreen", {state: {roomKey: key}})
        })
        socket.on("roomNotFound", (key:string)=>{
          setKey("key: "+key+" wasnt found");
        })

        socket.emit("joinGame", key)
    }

  return(
    <div>
        <input type="text" max="3" value={key} onChange={e=>setKey(e.target.value)}/>
        <button onClick={handleJoinGame}>Join Game</button>
    </div>
  )
}

export default JoinGame
