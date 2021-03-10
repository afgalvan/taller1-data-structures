import { Horse } from './Horse';

export class Race {
  id: number;
  jockeyName: string;
  horse?: Horse;
  distance: number;
  time: number;

  constructor() {
    this.id = 0;
    this.jockeyName = '';
    this.horse = new Horse();
    this.distance = 0;
    this.time = 0;
  }
}
