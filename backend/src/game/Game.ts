import { Socket } from "socket.io";
import {Player} from "../socket/createPlayer"
import { Card } from "./Cards";
import { deck } from "./Deck";
import { io } from "../server";
import { ResponseEmit, ResponseEndTurn, ResponseJoinGame, ResponseTakeCard } from "./Interfaces";

export class Game{
    key:string;
    players:Player[]=[];
    currentPlayer:number;
    gameDeck:Card[];
    isGameStarted:boolean;
    cardOnTop:Card;
    actionsThisTurn:number;

    constructor(key:string, player1:Player){
        this.key=key;
        this.addPlayer(player1);
        this.currentPlayer=0;
        this.gameDeck=[...deck];
        this.isGameStarted=false;
        this.cardOnTop=this.gameDeck[this.gameDeck.length-1];
        this.gameDeck.pop();
        this.actionsThisTurn=0;
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

    isActionCount(){
        return this.actionsThisTurn<1;
    }

    isDoingThisLegal(socket:Socket){
        return (this.players[this.currentPlayer].socket.id==socket.id&&this.isGameStarted)
    }

    takeCard(socket:Socket, callback: (response: ResponseTakeCard) => void){
        if(this.isDoingThisLegal(socket)&&this.isActionCount()){
            let card=this.gameDeck[this.gameDeck.length-1];
            this.gameDeck.pop();
            this.players[this.currentPlayer].hand.set(card.id, card);
            callback({succes: true, message: "card teaken succesfully", card:card});
            this.actionsThisTurn++;
        }
    }

    endTurn(socket:Socket){
        if(this.isDoingThisLegal(socket)){
            if(this.players.length-1==this.currentPlayer)this.currentPlayer=0;
            else this.currentPlayer++;
            io.to(this.key).emit("turnEnded", {succes:true, message: "turn ended", id:this.currentPlayer, name:this.players[this.currentPlayer].name});
            this.actionsThisTurn=0;
        }
    }

    useCard(socket:Socket, cardId:number, callback: (response: ResponseEmit) => void){
        if(this.isDoingThisLegal(socket)&&this.isActionCount()){
            let card = this.players[this.currentPlayer].hand.get(cardId);
            if(card?.canYouPlayMe(this.cardOnTop)){
                callback({succes: true, message: "card used succesfully"})
                this.cardOnTop=card;
                this.createEffectOfCard(card);
                io.to(this.key).emit("deckUpdate", this.cardOnTop);
                this.actionsThisTurn++;
            }
            else{
                callback({succes: false, message: "card using error"})
            }
        }
    }

    createEffectOfCard(card:Card){
        card.PlayMe(this);
    }

    startGame(socket:Socket){
        if(this.players[0].socket.id==socket.id){
            this.shuffleDeck();
            this.cardOnTop=this.gameDeck[this.gameDeck.length-1];
            io.to(this.key).emit("startingGame", this.cardOnTop);
            this.gameDeck.pop();
            this.isGameStarted=true;
        }
        else{
            socket.emit("cantStartGame");
        }
    }

    shuffleDeck(){
        let currentIndex = this.gameDeck.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.gameDeck[currentIndex], this.gameDeck[randomIndex]] = [this.gameDeck[randomIndex], this.gameDeck[currentIndex]];
        }
    }
}