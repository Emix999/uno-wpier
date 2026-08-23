import { useEffect, useState } from "react";
import { socket } from "../socket"
import { Card, ColoredCard } from "../typesClasses/Cards"
import type { ResponseEmit, ResponseMyHand } from "../typesClasses/Interfaces";
import ColorPicker from "./ColorPicker";
import type { Color } from "../typesClasses/Types";


function MyCards(props: { roomKey: string, myCards: Card[], setCards: React.Dispatch<React.SetStateAction<Card[]>> }) {

    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    let currentCard:Card;
    let currnetColor:Color="black";

    function handleUseCard(card: Card) {
        currentCard=card;
        currnetColor=card.color;
        if (card.askForColor) {
            setShowColorPicker(true);
        }
        else{
            emitUseCard();
        }
    }

    function emitUseCard() {
        console.log(currentCard);
        socket.emit("useCard", props.roomKey, currentCard.id, currnetColor, (response: ResponseEmit) => {
            if (response.succes) {
                console.log(response.message);
                props.setCards(prev =>
                    prev.filter(c => c.id !== currentCard.id)
                );
            }
            else {
                console.log(response.message);
            }
        });
    }

    useEffect(() => {
        socket.emit("getHand", props.roomKey);
        console.log("Chcę dostać kartę");
    }, []);

    useEffect(() => {
        socket.on("myHand", (response: ResponseMyHand) => {
            props.setCards(response.cards);
        })
    }, [])


    return (//to jest tymaczsowe... Jak pewnie się domyślasz :3
        <div>
            {showColorPicker && (<ColorPicker
                onDecision={(ChosenColor: Color) => {
                    currnetColor=ChosenColor;
                    emitUseCard();
                    setShowColorPicker(false);
                }}
            />)}
            My current cards are:
            {props.myCards.map((card, index) => (
                <p
                    key={index}
                    onClick={() => handleUseCard(card)}
                >
                    {card.name}-{card.color}
                </p>
            ))}

        </div>
    )
}
export default MyCards