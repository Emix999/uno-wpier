import { socket } from "../socket"

function TakeCard(props: { roomKey:string }){
    function handleTakeCard(){
        socket.once("cardTaken", ()=>{

        })

        socket.emit("takeCard", props.roomKey);
    }

    return(
        <button onClick={handleTakeCard}>Take Card</button>
    )
}

export default TakeCard