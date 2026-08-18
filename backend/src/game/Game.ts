import {Player} from "../socket/createPlayer"

export class Game{
    key:string;
    players:Player[];
    constructor(key:string, player1:Player){
        this.key=key;
        this.players=[player1];
    }
}