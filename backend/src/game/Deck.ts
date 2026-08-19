import {One, Card} from "./Cards"
export const deck: Card[] = [];
const usedCards: Card[] = [];

//tymczasowe do testów
for(let i=0;i<25;i++){
    deck.push(new One("red"))
    deck.push(new One("green"))
    deck.push(new One("red"))
    deck.push(new One("blue"))
}

//dodać reszte kart w decku

//losowanie kolejności dodać
// export function takeCard(){
//     console.log("You have taken card: "+deck[deck.length-1].symbol+" "+deck[deck.length-1].color)
//     deck.pop()
// }