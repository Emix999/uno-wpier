import { useEffect, useState } from 'react'
import CreateGame from './CreateGame'
import { socket } from '../socket'
import JoinGame from './JoinGame'
import EnterName from './EnterName'



function HomeScreen() {
  const [conId, setConId] = useState<undefined|string>(undefined)
  const [name, setName] = useState<string>("");

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
      <CreateGame name={name}/>
      <p>ID połączenia: {conId}</p>
      <JoinGame name={name}/>
      <EnterName name={name} setName={setName}/>
    </main>
)
}

export default HomeScreen
