import { useLocation, useNavigate } from "react-router-dom"
import TakeCard from "./TakeCard.tsx"
import EndTurn from "./EndTurn.tsx";
import type { Card } from "../typesClasses/Cards.ts";
import { useEffect, useState } from "react";
import MyCards from "./MyCards.tsx";
import Deck from "./Deck.tsx";
import { socket } from "../socket.ts";

function GameScreen() {
  const location = useLocation();
  const [myCards, setMyCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  
  function handleEndGame(player:{id:number, name:string}){
    alert("Game has ended. The winner is player "+player.id+" - "+player.name);
    navigate("/");
  }

  useEffect(()=>{
    socket.on("endGame", handleEndGame)
    return () => {
        socket.off("endGame", handleEndGame);
        };
  },[])

  let key = location.state?.roomKey;
  let startingCard = location.state?.cardOnTop;

  return(
    <main>
      <button>Take card</button>
      <p>room number is: {key}</p>
      <TakeCard roomKey={key} setCards={setMyCards}/>
      <EndTurn roomKey={key}/>
      <MyCards roomKey={key} myCards={myCards} setCards={setMyCards}/>
      <Deck startingCard={startingCard}/>
    </main>

  )
}
export default GameScreen
