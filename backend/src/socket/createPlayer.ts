import { Socket } from "socket.io";
import { Card } from "../game/Cards";

export class Player{
    //name: string
    socket:Socket;
    hand: Card[];
    constructor(/*name:string,*/ socket:Socket){
        //this.name=name;
        this.socket=socket;
        this.hand=[];
    }
}