import { Socket } from "socket.io";
import { Card } from "../game/Cards";

export class Player{
    name: string;
    socket:Socket;
    hand: Card[];
    constructor(socket:Socket, name:string){
        this.name=name;
        this.socket=socket;
        this.hand=[];
    }
}