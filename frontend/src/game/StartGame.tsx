import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import { useEffect } from 'react'

function StartGame(props: { roomKey:string }) {
    const navigate = useNavigate();

    useEffect(() => {
        function handleCantStartGame(){
            console.log("Only host of this lobby can start game");    
        }

        function handleStartingGame(){
            navigate("/GameScreen", {state: {roomKey: props.roomKey}})
        }

        socket.on("cantStartGame", handleCantStartGame);
        socket.on("startingGame", handleStartingGame);

        return () => {
        socket.off("cantStartGame", handleCantStartGame);
        socket.off("startingGame", handleStartingGame);
        };
    }, []);


    function handleStartGame() {
        socket.emit("startGame", props.roomKey);
    }

  return(
    <div>
        <button onClick={handleStartGame}>Start Game</button>
    </div>
  )
}

export default StartGame
