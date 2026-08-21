import { socket } from "../socket"
import type { ResponseEmit } from "../typesClasses/Types";

interface ResponsePlayer extends ResponseEmit{
    name:string;
    id:number;
}

function EndTurn(props: { roomKey:string }){
    
    function handleEndTurn(){
        socket.emit("endTurn", props.roomKey, (response:ResponsePlayer)=>{
                    if(response.succes){
                        console.log("it is now turn of player "+response.id+" - "+response.name);
                    }
                    else{
                        console.log(response.message);
                    }
                });
    }

    return <button onClick={handleEndTurn}>End Turn</button>
}
export default EndTurn