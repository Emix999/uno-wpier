import { createServer } from "http";
import { Server } from "socket.io";
import { CreateGame } from "./socket/createGame";
import { JoinGame } from "./socket/joinGame";
import { Socket } from "dgram";
import {Game} from "./game/Game"


const httpServer = createServer();

export const activeGames = new Map<string,Game>();

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Połączono:", socket.id);

  socket.on('createGame', ()=>{
    CreateGame(socket);
  })

  socket.on('joinGame', (key)=>{
    JoinGame(socket, key);
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

  socket.on("disconnect", () => {
    console.log("Rozłączono:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Backend działa na porcie 3000");
});