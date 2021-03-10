import { Horse } from './Horse';

export class Race {
  private id: number;
  private jockeyName: string;
  private horse?: Horse;
  private distance: number;
  private time: number;


  constructor() {
    this.id = 0;
    this.jockeyName = '';
    this.horse = new Horse();
    this.distance = 0;
    this.time = 0;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getJockeyName(): string {
    return this.jockeyName;
  }

  public setJockeyName(jockeyName: string): void {
    this.jockeyName = jockeyName;
  }

  public getHorse?(): Horse | undefined {
    return this.horse;
  }

  public setHorse(horse: Horse): void {
    this.horse = horse;
  }

  public getDistance(): number {
    return this.distance;
  }

  public setDistance(distance: number): void {
    this.distance = distance;
  }

  public getTime(): number {
    return this.time;
  }

  public setTime(time: number): void {
    this.time = time;
  }
}
