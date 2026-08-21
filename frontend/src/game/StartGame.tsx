import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import { useEffect } from 'react'
import type { Card } from '../typesClasses/Cards';

function StartGame(props: { roomKey:string }) {
    const navigate = useNavigate();
    //To jest zwalone i inne niż wszędzie indziej odbieranie wiadomości... ja wiem, może kiedyś to naprawię
    useEffect(() => {
        function handleCantStartGame(){
            console.log("Only host of this lobby can start game");    
        }

        function handleStartingGame(cardOnTop:Card){
            navigate("/GameScreen", {state: {roomKey: props.roomKey, cardOnTop: cardOnTop}})
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
