import { createServer } from "http";
import { Server } from "socket.io";
import { CreateGame } from "./socket/createGame";
import { JoinGame } from "./socket/joinGame";
import { Socket } from "dgram";
import {Game} from "./game/Game"
import { Card } from "./game/Cards";


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

  socket.on('joinGame', (key, name)=>{
    JoinGame(socket, key, name);
  })

  socket.on('takeCard', (key)=>{
    activeGames.get(key)?.takeCard(socket);
  })

  socket.on('endTurn', (key)=>{
    activeGames.get(key)?.endTurn(socket);
  })
  
  socket.on('startGame', (key)=>{
    activeGames.get(key)?.startGame(socket);
  })

  socket.on('useCard', (key, cardId:number, status: (success: boolean) => void)=>{
    activeGames.get(key)?.useCard(socket, cardId, status);
  })

  socket.on("disconnect", () => {
    console.log("Rozłączono:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Backend działa na porcie 3000");
});