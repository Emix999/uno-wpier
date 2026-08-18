import { useLocation } from "react-router-dom"
import TakeCard from "./TakeCard.tsx"

function GameScreen() {
  
  const location = useLocation();
  let key = location.state?.roomKey;

  return(
    <main>
      <button>Take card</button>
      <p>room number is: {key}</p>
      <TakeCard roomKey={key}/>
    </main>

  )
}
export default GameScreen
