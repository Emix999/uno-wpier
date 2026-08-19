import type { Color } from "./Types";
export abstract class Card{
  abstract name: string
  abstract symbol: string
  color: Color

  constructor(
    color: Color,
  ) {
    this.color=color
  }

  abstract playMe():void
}

export class One extends Card{
  name = "one"
  symbol = "1"

  constructor(
    color: Color,
  ){
    super(color)
  }

  playMe(): void {
    console.log("played 1")
  }
}