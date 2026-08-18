import type { Socket } from "socket.io";
import { Game } from "../game/Game";
import { Player } from "./createPlayer";
import {activeGames} from "../server.ts";


export function CreateGame(socket:Socket){
    let key=(Math.floor(Math.random()*100)).toString();
    socket.emit("roomCreated",key);
    const player1= new Player(socket);
    const game = new Game(key, player1);
    activeGames.set(key, game);
    socket.join(key);
}
