import { useEffect, useState } from "react"
import { socket } from "../socket"
import { Card } from "../typesClasses/Cards"

function Deck(props: { startingCard:Card }){

    const [cardOnTop, setCardOnTop]=useState<Card>(props.startingCard);

    useEffect(()=>{
        function handleDeckUpdate(card:Card){
          setCardOnTop(card);
        }
    
        socket.on("deckUpdate", handleDeckUpdate)
    
      return()=>{
        socket.off("deckUpdate", handleDeckUpdate)
      }
      },[])

    return(
        <p>
            Card on top is: {cardOnTop?.name} - {cardOnTop?.color}
        </p>
    )   
}
export default Deck;