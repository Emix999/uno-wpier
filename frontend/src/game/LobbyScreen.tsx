import { useLocation } from "react-router-dom"
import StartGame from "./StartGame";

function LobbyScreen() {
  
  const location = useLocation();
  let key = location.state?.roomKey;

  return(
    <main>
      <p>room number is: {key}</p>
      <StartGame roomKey={key}/>
    </main>

  )
}
export default LobbyScreen
