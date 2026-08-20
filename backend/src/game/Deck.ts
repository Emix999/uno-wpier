import {One, Card, Zero, Eight, Five, Four, Nine, Seven, Six, Three, Two, ChangeColor, PlusFour, PlusTwo, Reverse, Skip} from "./Cards"
export const deck: Card[] = [];
const usedCards: Card[] = [];

/*
Spis kart:
każda cyfra po 2 na kolor 
0 po jednym na kolor
skipy po 2 na kolor
reversy po 2 na kolor
+2 po 2 na kolor
+4 są 4
zmiana koloru jest 4
*/
//Tymczasowe uno zwykłe

//cyfry
deck.push(new One("red"));
deck.push(new One("green"));
deck.push(new One("yellow"));
deck.push(new One("blue"));
deck.push(new Two("red"));
deck.push(new Two("green"));
deck.push(new Two("yellow"));
deck.push(new Two("blue"));
deck.push(new Three("red"));
deck.push(new Three("green"));
deck.push(new Three("yellow"));
deck.push(new Three("blue"));
deck.push(new Four("red"));
deck.push(new Four("green"));
deck.push(new Four("yellow"));
deck.push(new Four("blue"));
deck.push(new Five("red"));
deck.push(new Five("green"));
deck.push(new Five("yellow"));
deck.push(new Five("blue"));
deck.push(new Six("red"));
deck.push(new Six("green"));
deck.push(new Six("yellow"));
deck.push(new Six("blue"));
deck.push(new Seven("red"));
deck.push(new Seven("green"));
deck.push(new Seven("yellow"));
deck.push(new Seven("blue"));
deck.push(new Eight("red"));
deck.push(new Eight("green"));
deck.push(new Eight("yellow"));
deck.push(new Eight("blue"));
deck.push(new Nine("red"));
deck.push(new Nine("green"));
deck.push(new Nine("yellow"));
deck.push(new Nine("blue"));
deck.push(new One("red"));
deck.push(new One("green"));
deck.push(new One("yellow"));
deck.push(new One("blue"));
deck.push(new Two("red"));
deck.push(new Two("green"));
deck.push(new Two("yellow"));
deck.push(new Two("blue"));
deck.push(new Three("red"));
deck.push(new Three("green"));
deck.push(new Three("yellow"));
deck.push(new Three("blue"));
deck.push(new Four("red"));
deck.push(new Four("green"));
deck.push(new Four("yellow"));
deck.push(new Four("blue"));
deck.push(new Five("red"));
deck.push(new Five("green"));
deck.push(new Five("yellow"));
deck.push(new Five("blue"));
deck.push(new Six("red"));
deck.push(new Six("green"));
deck.push(new Six("yellow"));
deck.push(new Six("blue"));
deck.push(new Seven("red"));
deck.push(new Seven("green"));
deck.push(new Seven("yellow"));
deck.push(new Seven("blue"));
deck.push(new Eight("red"));
deck.push(new Eight("green"));
deck.push(new Eight("yellow"));
deck.push(new Eight("blue"));
deck.push(new Nine("red"));
deck.push(new Nine("green"));
deck.push(new Nine("yellow"));
deck.push(new Nine("blue"));
deck.push(new Zero("red"));
deck.push(new Zero("green"));
deck.push(new Zero("yellow"));
deck.push(new Zero("blue"));
//skipy
deck.push(new Skip("red"));
deck.push(new Skip("green"));
deck.push(new Skip("yellow"));
deck.push(new Skip("blue"));
deck.push(new Skip("red"));
deck.push(new Skip("green"));
deck.push(new Skip("yellow"));
deck.push(new Skip("blue"));
//reversy
deck.push(new Reverse("red"));
deck.push(new Reverse("green"));
deck.push(new Reverse("yellow"));
deck.push(new Reverse("blue"));
deck.push(new Reverse("red"));
deck.push(new Reverse("green"));
deck.push(new Reverse("yellow"));
deck.push(new Reverse("blue"));
//+2
deck.push(new PlusTwo("red"));
deck.push(new PlusTwo("green"));
deck.push(new PlusTwo("yellow"));
deck.push(new PlusTwo("blue"));
deck.push(new PlusTwo("red"));
deck.push(new PlusTwo("green"));
deck.push(new PlusTwo("yellow"));
deck.push(new PlusTwo("blue"));
//+4
deck.push(new PlusFour());
deck.push(new PlusFour());
deck.push(new PlusFour());
deck.push(new PlusFour());
//zmiana koloru
deck.push(new ChangeColor());
deck.push(new ChangeColor());
deck.push(new ChangeColor());
deck.push(new ChangeColor());