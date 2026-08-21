import type { Socket } from "socket.io";
import {activeGames} from "../server.ts";
import { Player } from "./createPlayer.ts";
import { ResponseJoinGame } from "../game/Interfaces.ts";

export function JoinGame(socket:Socket, key:string, name:string, callback: (response: ResponseJoinGame) => void){
    if(activeGames.has(key)&&activeGames.get(key)?.isGameStarted==false){
        const game = activeGames.get(key);
        if(!game)return;//to jest głupia linijka kodu dla deblinego typescripta!jshdgfkjashdfgksjldhfgksdjhfgajshdfgasjkhfg!!! 
        const player = new Player(socket, name);
        game?.addPlayer(player);
        socket.emit("roomJoined", key, game?.updatePlayerList());
        callback({succes: true, message: "card used succesfully", key:key, playerList:game.updatePlayerList()})
        socket.join(key);
    }
    else{
        socket.emit("roomNotFound",key);
    }
}
