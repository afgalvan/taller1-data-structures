import { Horse } from '../models/Horse';
import { Race } from '../models/Race';
import { FormController } from './form.controller';

export class Utils {
  static isUnique = (name: string, horseList: Horse[]): boolean => {
    for (let i = 0; i < horseList.length; i++) {
      if (horseList[i] == null) {
        return true;
      }
      if (name.toLowerCase() === horseList[i].getName().toLowerCase()) {
        return false;
      }
    }

    return true;
  };

  static findHorse = (horseName: string, horseList: Horse[]): Horse | null => {
    for (let horse of horseList) {
      if (horse.getName().toLowerCase() === horseName.toLowerCase()) {
        return horse;
      }
    }
    return null;
  };

  static selectWinners = (horse: Horse, race: Race): void => {
    if (!race.getHorseWinner()) {
      race.setHorseWinner(horse);
    } else if (horse.getSpeed() > race.getHorseWinner().getSpeed()) {
      race.setSecondPlace(race.getHorseWinner());
      race.setHorseWinner(horse);
    }
  };

  private static arrayPartition = (array: Horse[], init: number, limit: number): number => {
    let j: number,
      swap: Horse,
      i = init - 1;
    let pivot = array[limit];

    for (j = init; j < limit; j++) {
      if (array[j].getAge() <= pivot.getAge()) {
        i++;
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
      }
    }

    swap = array[i + 1];
    array[i + 1] = array[limit];
    array[limit] = swap;
    return i + 1;
  };

  static quickSort = (horses: Horse[], init: number, limit: number) => {
    let partition_index: number;

    if (init < limit) {
      partition_index = Utils.arrayPartition(horses, init, limit);

      Utils.quickSort(horses, init, partition_index - 1);
      Utils.quickSort(horses, partition_index + 1, limit);
    }
  };

  static evalMVP(formController: FormController): void {
    const horses = formController.getHorseList();
    let horseWinsRecord = 0;
    let jockeyWinsRecord = 0;
    let horseMVPIndex = 0;
    let jockeyMVPIndex = 0;
    for (let i = 0; i < horses.length; ++i) {
      if (horses[i].getWins() > horseWinsRecord) {
        horseWinsRecord = horses[i].getWins();
        horseMVPIndex = i;
      }
      if (horses[i].getJockey().getWins() > jockeyWinsRecord) {
        jockeyWinsRecord = horses[i].getJockey().getWins();
        jockeyMVPIndex = i;
      }
    }
    formController.setHorseMVP(horses[horseMVPIndex]);
    formController.setJockeyMVP(horses[jockeyMVPIndex]);
  }
}
