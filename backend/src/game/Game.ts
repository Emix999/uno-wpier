import { Socket } from "socket.io";
import {Player} from "../socket/createPlayer"
import { Card } from "./Cards";
import { deck } from "./Deck";
import { emit } from "node:cluster";

export class Game{
    key:string;
    players:Player[]=[];
    currentPlayer:number;
    gameDeck:Card[];

    constructor(key:string, player1:Player){
        this.key=key;
        this.addPlayer(player1);
        this.currentPlayer=0;
        this.gameDeck=[...deck];
    }
    nextTurn(){
        this.currentPlayer++;
    }
    addPlayer(player:Player){
        this.players.push(player);
    }

    isThisRightPlayer(socket:Socket){
        return (this.players[this.currentPlayer].socket.id==socket.id)
    }

    takeCard(socket:Socket){
        if(this.isThisRightPlayer(socket)){
            let card=this.gameDeck[this.gameDeck.length-1];
            this.gameDeck.pop();
            this.players[this.currentPlayer].hand.push(card);
            socket.emit("cardTaken", card);

        }
    }
}