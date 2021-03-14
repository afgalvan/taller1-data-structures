import { Horse } from '../models/Horse';
import { Race } from '../models/Race';
import { FormController } from './form.controller';

export class Utils {
  static isUnique = (name: string, horseList: Horse[]): boolean => {
    for (let i = 0; i < horseList.length; i++) {
      if (horseList[i] == null) {
        return true;
      }
      if (name === horseList[i].getName()) {
        return false;
      }
    }

    return true;
  };

  static findHorse = (horseName: string, horseList: Horse[]): Horse | null => {
    for (let h of horseList) {
      if (h.getName() == horseName) {
        return h;
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
    let winsRecord = 0;
    let MVPIndex = 0;
    for (let i = 0; i < horses.length; ++i) {
      if (horses[i].getWins() > winsRecord) {
        winsRecord = horses[i].getWins();
        MVPIndex = i;
      }
    }
    formController.setHorseMVP(horses[MVPIndex]);
    formController.setJockeyMVP(horses[MVPIndex]);
  }
}
