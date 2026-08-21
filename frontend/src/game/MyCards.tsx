import { socket } from "../socket"
import { Card } from "../typesClasses/Cards"
import type { ResponseEmit } from "../typesClasses/Types";


function MyCards(props: {roomKey:string ,myCards:Card[], setCards: React.Dispatch<React.SetStateAction<Card[]>>}){

    function handleUseCard(card:Card){
        // socket.emit("endTurn", props.roomKey, (response:ResponseEmit)=>{
        //     if(response.succes){
        //         console.log(response.message);
        //     }
        //     else{
        //         console.log(response.message);
        //     }
        // });

        socket.emit("useCard", props.roomKey, card.id, (response:ResponseEmit)=>{
            if(response.succes){
                console.log(response.message);
                props.setCards(prev =>
                    prev.filter(c => c.id !== card.id)
                );
            }
            else{
                console.log(response.message);
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