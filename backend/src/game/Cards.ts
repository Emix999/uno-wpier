import { Game } from "./Game";
import type { Color } from "./Types";
export abstract class Card {
  abstract name: string;
  abstract symbol: string;
  color: Color;
  static numberOfCards = 0;
  id: number;
  abstract askForColor: boolean;

  constructor(
    color: Color,
  ) {
    this.color = color;
    this.id = Card.numberOfCards;
    Card.numberOfCards++;
  }
  abstract PlayMe(game:Game): void;
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
  PlayMe(game:Game) {
    return
  }
}
export class Two extends ColoredCard {
  symbol = "2";
  name = "two";
  PlayMe(game:Game) {
    return
  }
}
export class Three extends ColoredCard {
  symbol = "3";
  name = "three";
  PlayMe(game:Game) {
    return
  }
}
export class Four extends ColoredCard {
  symbol = "4";
  name = "four";
  PlayMe(game:Game) {
    return
  }
}
export class Five extends ColoredCard {
  symbol = "5";
  name = "five";
  PlayMe(game:Game) {
    return
  }
}
export class Six extends ColoredCard {
  symbol = "6";
  name = "six";
  PlayMe(game:Game) {
    return
  }
}
export class Seven extends ColoredCard {
  symbol = "7";
  name = "seven";
  PlayMe(game:Game) {
    return
  }
}
export class Eight extends ColoredCard {
  symbol = "8";
  name = "eight";
  PlayMe(game:Game) {
    return
  }
}
export class Nine extends ColoredCard {
  symbol = "9";
  name = "nine";
  PlayMe(game:Game) {
    return
  }
}
export class Zero extends ColoredCard {
  symbol = "0";
  name = "zero";
  PlayMe(game:Game) {
    return
  }
}
export class PlusTwo extends ColoredCard {
  symbol = "+2";
  name = "plus two";
  PlayMe(game:Game) {
    return
  }
}
export class Skip extends ColoredCard {
  symbol = "(/)";
  name = "skip";
  PlayMe(game:Game) {
    return
  }
}
export class Reverse extends ColoredCard {
  symbol = "-><-";
  name = "reverse";
  PlayMe(game:Game) {
    return
  }
}

export class PlusFour extends BlackCard {
  askForColor = true;
  symbol = "+4";
  name = "plus four";
  PlayMe(game:Game) {
    
  }
}
export class ChangeColor extends BlackCard {
  askForColor = true;
  symbol = "color";
  name = "change color";
  PlayMe(game:Game) {
    return
  }
}