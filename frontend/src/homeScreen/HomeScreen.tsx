import { useEffect, useState } from 'react'
import CreateGame from './CreateGame'
import { socket } from '../socket'
import JoinGame from './JoinGame'
import EnterName from './EnterName'
import "./HomeScreen.scss"


function HomeScreen() {
  const [conId, setConId] = useState<undefined|string>(undefined)
  const [name, setName] = useState<string>("");

  useEffect(()=>{
    function handleConnect(){
      setConId(socket.id)
    }

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect)

  return()=>{
    socket.off("connect", handleConnect)
  }
  },[])

  return (
    <main>
      <p className='idPol'>ID połączenia: {conId}</p>
      <div className='contentBox'>
        <img src="assets/logo.png" alt="nouno" className='logo'/>
        <span>your nick:</span>
        <EnterName name={name} setName={setName}/>
        <CreateGame name={name}/>        
        <JoinGame name={name}/>
      </div>
      <button className='settingsButton'>⚙️</button>{/*image zamiast emoji dodać potem*/}
    </main>
)
}

export default HomeScreen
