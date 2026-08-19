import { useState } from "react";
import { socket } from "../socket"
import type { Card } from "../typesClasses/Cards";

function TakeCard(props: { roomKey:string }){
    const [currentCard, setCurrentCard]=useState<Card>()
    function handleTakeCard(){
        socket.once("cardTaken", (card:Card)=>{
            setCurrentCard(card);
        })

        socket.emit("takeCard", props.roomKey);
    }

    return(
        <div>
            <p>Currently holding: {currentCard?.color}, {currentCard?.name}</p>
            <button onClick={handleTakeCard}>Take Card</button>
        </div>
    )
}

export default TakeCard