import { socket } from "../socket"
import { Card } from "../typesClasses/Cards"

function MyCards(props: {roomKey:string ,myCards:Card[], setCards: React.Dispatch<React.SetStateAction<Card[]>>}){

    function handleUseCard(card:Card){
        socket.emit("useCard", props.roomKey, card.id, (status:boolean)=>{
            if(status){
                console.log("succesfully used card");
                props.setCards(prev =>
                    prev.filter(c => c.id !== card.id)
                );
            }
            else{
                console.log("you cant use this card in this space-time");
            }
        });
    }

    return (//to jest tymaczsowe... Jak pewnie się domyślasz :3
        <div>
            My current cards are: 
            {props.myCards.map((card, index) => (
                <p 
                key={index}
                onClick={()=>handleUseCard(card)}
                >
                    {card.name}-{card.color}
                </p>
            ))}
                
        </div>
    )
}
export default MyCards