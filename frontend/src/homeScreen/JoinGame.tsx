import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import { useState } from 'react'
import type { ResponseJoinGame } from '../typesClasses/Interfaces';
import "./HomeScreen.scss"



function JoinGame(props: { name: string }) {
  const navigate = useNavigate();

  const [key, setKey] = useState<string>();

  function handleJoinGame() {// tu też było to stare zwalone odbieranie wiadomości ale je napirawiłem :3
    socket.emit("joinGame", key, props.name, (response: ResponseJoinGame) => {
      if (response.succes) {
        console.log(response.message);
        navigate("/LobbyScreen", { state: { roomKey: response.key, playerList: response.playerList } })
      }
      else {
        setKey(response.message);
      }
    });
  }


  return (
    <div>
      <button onClick={handleJoinGame} className='joinGame'>Join Game</button>
      <div className='joinCode'>
        <span>enter code to join:</span>
        <input type="text" max="3" value={key} onChange={e => setKey(e.target.value)} />{/*ta trójka jest tutaj tylko tymczasowo jak coś*/}
      </div>
    </div>
  )
}

export default JoinGame
