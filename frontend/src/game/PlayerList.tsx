import { useEffect, useState } from "react"
import { socket } from "../socket";

function PlayerList(props: {playerList:string[]}){
    const [playerList, setPlayerList] = useState<string[]>(props.playerList);
    useEffect(() => {
        function handlePlayertListUpdate(list:string[]){
            setPlayerList(list);
        }

        socket.on("playerListUpdate", handlePlayertListUpdate);

        return () => {
        socket.off("playerListUpdate", handlePlayertListUpdate);
        };
    }, []);

    return <p>Player list: {playerList}</p>
}
export default PlayerList