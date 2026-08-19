import { Socket } from "socket.io";
import {Player} from "../socket/createPlayer"
import { Card } from "./Cards";
import { deck } from "./Deck";
import { io } from "../server";

export class Game{
    key:string;
    players:Player[]=[];
    currentPlayer:number;
    gameDeck:Card[];
    isGameStarted:boolean;
    cardOnTop:Card;

    constructor(key:string, player1:Player){
        this.key=key;
        this.addPlayer(player1);
        this.currentPlayer=0;
        this.gameDeck=[...deck];
        this.isGameStarted=false;
        this.cardOnTop=this.gameDeck[this.gameDeck.length-1];
        this.gameDeck.pop();
    }
    addPlayer(player:Player){
        this.players.push(player);
    }

    updatePlayerList(){
        let list:string[]=[];
        for(let p of this.players){
            list.push(p.name);
        }
        io.to(this.key).emit("playerListUpdate", list);
        return list;
    }

    isDoingThisLegal(socket:Socket){
        return (this.players[this.currentPlayer].socket.id==socket.id&&this.isGameStarted)
    }

    takeCard(socket:Socket){
        if(this.isDoingThisLegal(socket)){
            let card=this.gameDeck[this.gameDeck.length-1];
            this.gameDeck.pop();
            this.players[this.currentPlayer].hand.push(card);
            socket.emit("cardTaken", card);

        }
    }

    endTurn(socket:Socket){
        if(this.isDoingThisLegal(socket)){
            if(this.players.length-1==this.currentPlayer)this.currentPlayer=0;
            else this.currentPlayer++;
            io.to(this.key).emit("turnEnded", this.currentPlayer, this.players[this.currentPlayer].name);
        }
    }

    useCard(socket:Socket, card:Card){
        if(this.isDoingThisLegal(socket)){
            //tu gdzieś się przypnie logikę wykładania kart
            //na razie każdą na każdą można wyłożyć
            if(true){
                socket.emit("cardUsed");
                this.cardOnTop=card;
                io.to(this.key).emit("deckUpdate", this.cardOnTop);
            }
            else{
                socket.emit("cardUsingError");
            }
        }
    }

    startGame(socket:Socket){
        if(this.players[0].socket.id==socket.id){
            io.to(this.key).emit("startingGame");
            this.isGameStarted=true;
        }
        else{
            socket.emit("cantStartGame");
        }
    }
}