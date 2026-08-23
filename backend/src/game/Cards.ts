import { Game } from "./Game";
import type { Color } from "./Types";
export abstract class Card {
  abstract name: string;
  abstract symbol: string;
  color: Color;
  static numberOfCards = 0;
  id: number;
  abstract askForColor: boolean;
  numberCards:number=0;
  numberStops:number=0;

  constructor(
    color: Color,
  ) {
    this.color = color;
    this.id = Card.numberOfCards;
    Card.numberOfCards++;
  }
  PlayMe(game:Game){
    return
  }
  abstract canYouPlayMe(currentCard: Card): boolean;
}

export abstract class BlackCard extends Card {
  constructor() {
    super("black");
  }

  canYouPlayMe(currentCard: Card): boolean {
    return true;
  }
}

export abstract class ColoredCard extends Card {
  askForColor=false;
  canYouPlayMe(currentCard: Card): boolean {
    return (currentCard.color == this.color || currentCard.symbol == this.symbol);
  }
}

export class One extends ColoredCard {
  symbol = "1";
  name = "one";

}
export class Two extends ColoredCard {
  symbol = "2";
  name = "two";

}
export class Three extends ColoredCard {
  symbol = "3";
  name = "three";

}
export class Four extends ColoredCard {
  symbol = "4";
  name = "four";

}
export class Five extends ColoredCard {
  symbol = "5";
  name = "five";

}
export class Six extends ColoredCard {
  symbol = "6";
  name = "six";

}
export class Seven extends ColoredCard {
  symbol = "7";
  name = "seven";

}
export class Eight extends ColoredCard {
  symbol = "8";
  name = "eight";

}
export class Nine extends ColoredCard {
  symbol = "9";
  name = "nine";

}
export class Zero extends ColoredCard {
  symbol = "0";
  name = "zero";

}
export class PlusTwo extends ColoredCard {
  symbol = "+2";
  name = "plus two";
  numberCards=2;
  PlayMe(game: Game){
    game.cardPool+=this.numberCards;
    //game.numberToDeflect=this.numberCards;
  }
}
export class Skip extends ColoredCard {
  symbol = "(/)";
  name = "skip";

}
export class Reverse extends ColoredCard {
  symbol = "-><-";
  name = "reverse";

}

export class PlusFour extends BlackCard {
  askForColor = true;
  symbol = "+4";
  name = "plus four";
  numberCards=2;
  PlayMe(game:Game) {
      this.color=game.currentCardColor;
  }
}
export class ChangeColor extends BlackCard {
  askForColor = true;
  symbol = "color";
  name = "change color";
  PlayMe(game:Game) {
      this.color=game.currentCardColor;
  }
}