import { useLocation } from "react-router-dom"
import StartGame from "./StartGame";
import PlayerList from "./PlayerList";

function LobbyScreen() {
  
  const location = useLocation();
  let key = location.state?.roomKey;
  return(
    <main>
      <p>room number is: {key}</p>
      <StartGame roomKey={key}/>
      <PlayerList playerList={location.state?.playerList}/>
    </main>

  )
}
export default LobbyScreen
