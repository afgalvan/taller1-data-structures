import { Horse } from '../models/Horse';
import { Jockey } from '../models/Jockey';
import { Race } from '../models/Race';
import { Table } from '../models/Table';

export class TableController {
  private horsesWinners: Table;
  private horseMVPTable: Table;
  private jockeyMVPTable: Table;
  private raceList: Race[];
  private horseMVP: Horse;
  private jockeyMVP: Jockey;

  constructor(raceList: Race[], horseMVP: Horse, jockeyMVP: Jockey) {
    this.horsesWinners = new Table('horseWinners');
    this.horseMVPTable = new Table('horseMVP');
    this.jockeyMVPTable = new Table('jockeyMVP');
    this.raceList = raceList;
    this.horseMVP = horseMVP;
    this.jockeyMVP = jockeyMVP;
  }

  start = (): void => {
    this.fillWinnersTable();
    this.fillMVPTable();
  };

  loadTitle = (): void => {
    const title = document.getElementById('headTitle');
    title?.classList.remove('hideTitle');
  };

  fillWinnersTable = () => {
    if (this.raceList[0] === undefined) return;
    for (let i = 0; i < 1; i++) {
      this.horsesWinners.addRowAt(i + 1, [
        `${i + 1}`,
        '1',
        `${this.raceList[i].getHorseWinner().getName()}`,
      ]);
      this.horsesWinners.addRowAt(i + 2, [
        `${i + 1}`,
        '2',
        `${this.raceList[i].getSecondPlace().getName()}`,
      ]);
    }
  };

  fillMVPTable = (): void => {
    this.horseMVPTable.addRowAt(1, [this.horseMVP.getName(), `${this.horseMVP.getWins()}`]);
    this.jockeyMVPTable.addRowAt(1, [this.jockeyMVP.getName(), `${this.jockeyMVP.getWins()}`]);
  };
}
