import { Horse } from './Horse';
import { Jockey } from './Jockey';

export class Race {
  private id: number;
  private horseList: Horse[];
  private horseWinner: Horse;
  private secondPlace: Horse;
  private jockeyWinner: Jockey;

  constructor() {
    this.id = 0;
    this.horseList = new Array<Horse>(4);
    this.horseWinner = new Horse();
    this.secondPlace = new Horse();
    this.jockeyWinner = new Jockey();
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public addHorseAt(index: number, horse: Horse): void {
    this.horseList[index] = horse;
  }

  public getHorseList(): Horse[] {
    return this.horseList;
  }

  public getHorseAt(index: number): Horse {
    return this.horseList[index];
  }

  public getHorseWinner(): Horse {
    return this.horseWinner;
  }

  public setHorseWinner(horseWinner: Horse): void {
    this.horseWinner = horseWinner;
  }

  public getSecondPlace(): Horse {
    return this.secondPlace;
  }

  public setSecondPlace(secondPlace: Horse): void {
    this.secondPlace = secondPlace;
  }

  public getJockeyWinner(): Jockey {
    return this.jockeyWinner;
  }

  public setJockeyWinner(jockeyWinner: Jockey): void {
    this.jockeyWinner = jockeyWinner;
  }
}
