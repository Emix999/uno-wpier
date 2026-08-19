import type { Socket } from "socket.io";
import {activeGames} from "../server.ts";
import { Player } from "./createPlayer.ts";

export function JoinGame(socket:Socket, key:string, name:string){
    if(activeGames.has(key)){
        const game = activeGames.get(key);
        const player = new Player(socket, name);
        game?.addPlayer(player);
        socket.emit("roomJoined", key, game?.updatePlayerList());
        socket.join(key);
    }
    else{
        socket.emit("roomNotFound",key);
    }
}
