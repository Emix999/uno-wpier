import { Socket } from "socket.io";
import { Card } from "../game/Cards";

export class Player{
    name: string;
    socket:Socket;
    hand: Map<number, Card> = new Map();
    constructor(socket:Socket, name:string){
        this.name=name;
        this.socket=socket;
    }
}