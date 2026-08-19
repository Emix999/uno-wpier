import type { Socket } from "socket.io";
import { Game } from "../game/Game";
import { Player } from "./createPlayer";
import {activeGames} from "../server.ts";


export function CreateGame(socket:Socket, name:string){
    let key=(Math.floor(Math.random()*100)).toString();
    const player1= new Player(socket, name);
    const game = new Game(key, player1);
    activeGames.set(key, game);
    socket.join(key);
    socket.emit("roomCreated", key, game.updatePlayerList());
}
