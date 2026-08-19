import { useLocation } from "react-router-dom"
import TakeCard from "./TakeCard.tsx"
import EndTurn from "./EndTurn.tsx";
import type { Card } from "../typesClasses/Cards.ts";
import { useState } from "react";
import MyCards from "./MyCards.tsx";
import Deck from "./Deck.tsx";

function GameScreen() {
  
  const [myCards, setMyCards] = useState<Card[]>([]);
  const location = useLocation();
  let key = location.state?.roomKey;

  return(
    <main>
      <button>Take card</button>
      <p>room number is: {key}</p>
      <TakeCard roomKey={key} setCards={setMyCards}/>
      <EndTurn roomKey={key}/>
      <MyCards roomKey={key} myCards={myCards} setCards={setMyCards}/>
      <Deck />
    </main>

  )
}
export default GameScreen
