import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import { useState } from 'react'

function JoinGame(props: { name:string }) {
    const navigate = useNavigate();

    const [key, setKey] = useState<string>();

    function handleJoinGame() {// tu też było to stare zwalone odbieranie wiadomości ale je napirawiłem :3
        socket.once("roomJoined", (key:string, playerList:string[])=>{
          navigate("/LobbyScreen", {state: {roomKey: key, playerList: playerList}})
        })
        socket.once("roomNotFound", (key:string)=>{
          setKey("key: "+key+" wasnt found");
        })

        socket.emit("joinGame", key, props.name);
    }

  return(
    <div>
        <input type="text" max="3" value={key} onChange={e=>setKey(e.target.value)}/>
        <button onClick={handleJoinGame}>Join Game</button>
    </div>
  )
}

export default JoinGame
