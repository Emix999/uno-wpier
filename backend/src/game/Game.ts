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
    numberOfStartingCards:number;
    hostIndex:number;

    constructor(key:string, player1:Player){
        this.key=key;
        this.addPlayer(player1);
        this.currentPlayer=0;
        this.gameDeck=[...deck];
        this.isGameStarted=false;
        this.cardOnTop=this.gameDeck[this.gameDeck.length-1];
        this.gameDeck.pop();
        this.actionsThisTurn=0;
        this.numberOfStartingCards=7;
        this.hostIndex=0;
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

    giveStartingCards(socket:Socket){
        if(this.players[0].hand)
        console.log("usytawię karty dla graczy")
        for(let i=0;i<this.numberOfStartingCards;i++){
            for(let p of this.players){
                let card=this.gameDeck[this.gameDeck.length-1];
                this.gameDeck.pop();
                p.hand.set(card.id, card);
            }
        }
        console.log("ustawiłem wszystkim graczom karty")
        this.sendAllPlayersHand(socket);
    }

    sendAllPlayersHand(socket:Socket){
        if(this.isGameStarted&&this.players[this.hostIndex].socket==socket){
            for(let p of this.players){
                console.log("wysyłam karty do każdego gracza");
                const hand = [...p.hand.values()];
                p.socket.emit("myHand", {succes: true, message: "Succesfully got hands of players", cards:hand});
            }
        }
    }

    startGame(socket:Socket){
        if(this.players[this.hostIndex].socket.id==socket.id){
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