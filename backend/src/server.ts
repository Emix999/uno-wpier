import { createServer } from "http";
import { Server } from "socket.io";
import { CreateGame } from "./socket/createGame";
import { JoinGame } from "./socket/joinGame";
import { Socket } from "dgram";
import {Game} from "./game/Game"
import { Card } from "./game/Cards";
import { ResponseEmit, ResponseEndTurn, ResponseJoinGame, ResponseTakeCard } from "./game/Interfaces";
import { Color } from "./game/Types";

const httpServer = createServer();

export const activeGames = new Map<string,Game>();

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Połączono:", socket.id);

  socket.on('createGame', (name)=>{
    CreateGame(socket, name);
  })

  socket.on('joinGame', (key, name, callback: (response: ResponseEmit) => void)=>{
    JoinGame(socket, key, name, callback);
  })

  socket.on('takeCard', (key, callback: (response: ResponseTakeCard) => void)=>{
    activeGames.get(key)?.takeCard(socket, callback);
  })

  socket.on('getHand', (key)=>{
    activeGames.get(key)?.giveStartingCards(socket);
    console.log("wiem że chchesz ją dostać");
  }) 

  socket.on('endTurn', (key)=>{
    activeGames.get(key)?.endTurn(socket);
  })
  
  socket.on('startGame', (key)=>{
    activeGames.get(key)?.startGame(socket);
  })

  socket.on('useCard', (key, cardId:number, color:Color, callback: (response: ResponseEmit) => void)=>{
    console.log("id: "+cardId);
    console.log("color: "+color);
    activeGames.get(key)?.useCard(socket, cardId, color, callback);
  })

  socket.on("disconnect", () => {
    console.log("Rozłączono:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Backend działa na porcie 3000");
});