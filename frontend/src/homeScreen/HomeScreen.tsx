import { useEffect, useState } from 'react'
import StartGame from './CreateGame'
import { socket } from '../socket'
import JoinGame from './JoinGame'



function HomeScreen() {
  const [conId, setConId] = useState<undefined|string>(undefined)

  useEffect(()=>{
    function handleConnect(){
      setConId(socket.id)
    }

    socket.on("connect", handleConnect)

  return()=>{
    socket.off("connect", handleConnect)
  }
  },[])



  return (
    <main>
      <StartGame />
      <p>ID połączenia: {conId}</p>
      <JoinGame />
    </main>
)
}

export default HomeScreen
