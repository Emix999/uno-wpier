import { socket } from "../socket"
import type { ResponseEndTurn } from "../typesClasses/Interfaces";

function EndTurn(props: { roomKey:string }){
    
    function handleEndTurn(){
        socket.once("turnEnded", (response:ResponseEndTurn)=>{
            if(response.succes){
                console.log("it is now turn of player "+response.id+" - "+response.name);
            }
            else{
                console.log(response.message);
            }
        })
        socket.emit("endTurn", props.roomKey);
    }

    return <button onClick={handleEndTurn}>End Turn</button>
}
export default EndTurn