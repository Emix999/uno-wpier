import { socket } from "../socket"

function EndTurn(props: { roomKey:string }){
    
    function handleEndTurn(){
        socket.once("turnEnded", (id: number, name:string)=>{
            console.log("it is now turn of player "+id+" - "+name);
        })

        socket.emit("endTurn", props.roomKey);
    }

    return <button onClick={handleEndTurn}>End Turn</button>
}
export default EndTurn