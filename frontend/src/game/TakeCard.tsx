import { socket } from "../socket"
import type { Card } from "../typesClasses/Cards";

function TakeCard(props: { roomKey:string, setCards: React.Dispatch<React.SetStateAction<Card[]>>}){//ten dziwny typ to typ tego settera do kart
    function handleTakeCard(){
        socket.once("cardTaken", (card:Card)=>{
            props.setCards(prev => [...prev, card]);//to coś dziwne dodaje kartę do tablicy
        })

        socket.emit("takeCard", props.roomKey);
    }

    return(
        <div>
            <button onClick={handleTakeCard}>Take Card</button>
        </div>
    )
}

export default TakeCard