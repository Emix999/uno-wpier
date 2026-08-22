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
}

export abstract class BlackCard extends Card {
  constructor() {
    super("black");
  }
}

export abstract class ColoredCard extends Card {
  askForColor=false;
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
}
export class ChangeColor extends BlackCard {
  askForColor = true;
  symbol = "color";
  name = "change color";
}