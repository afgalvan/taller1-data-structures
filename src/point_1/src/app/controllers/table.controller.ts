import { Table } from '../models/Table';

export class TableController {
  horsesWinners: Table;
  horseMVP: Table;
  jockeyMVP: Table;

  constructor() {
    this.horsesWinners = new Table('horseWinners');
    this.horseMVP = new Table('horseMVP');
    this.jockeyMVP = new Table('jockeyMVP');
  }

  start = () => {
    this.loadTitle();
    this.fillWinnersTable();
    this.fillMVPTable();
  };

  loadTitle = () => {
    const title = document.getElementById('headTitle');
    title?.classList.remove('hidden');
  };

  fillWinnersTable = () => {
    this.horsesWinners.addRowAt(1, ['1', '1', 'Maximus']);
    this.horsesWinners.addRowAt(2, ['1', '2', 'Maximus']);
    this.horsesWinners.addRowAt(3, ['2', '1', 'Maximus']);
    this.horsesWinners.addRowAt(4, ['2', '2', 'Maximus']);
  };

  fillMVPTable = () => {
    this.horseMVP.addRowAt(1, ['Maximus', '1']);
    this.jockeyMVP.addRowAt(1, ['Aurelio', '1']);
  };
}
