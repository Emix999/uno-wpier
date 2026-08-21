import { socket } from "../socket"
import type { Card } from "../typesClasses/Cards";
import type { ResponseEmit } from "../typesClasses/Types";

interface ResponseCard extends ResponseEmit{
    card:Card;
}

function TakeCard(props: { roomKey:string, setCards: React.Dispatch<React.SetStateAction<Card[]>>}){//ten dziwny typ to typ tego settera do kart
    function handleTakeCard(){
        socket.emit("takeCard", props.roomKey, (response:ResponseCard)=>{
            if(response.succes){
                props.setCards(prev => [...prev, response.card]);//to coś dziwne dodaje kartę do tablicy
            }
            else{
                console.log(response.message);
            }
        });
    }

    return(
        <div>
            <button onClick={handleTakeCard}>Take Card</button>
        </div>
    )
}

export default TakeCard