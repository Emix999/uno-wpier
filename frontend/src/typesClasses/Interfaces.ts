import type { Card } from "./Cards";

export interface ResponseEmit{
    succes:boolean;
    message:string;
}

export interface ResponseJoinGame extends ResponseEmit{
  key: string;
  playerList: string[];
}

export interface ResponseEndTurn extends ResponseEmit{
    name:string;
    id:number;
}

export interface ResponseTakeCard extends ResponseEmit{
    card:Card;
}

export interface ResponseMyHand extends ResponseEmit{
    cards:Card[];
}