import { Horse } from '../models/Horse';
import { Race } from '../models/Race';

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
    if (!race.getHorseWinner() || horse.getSpeed() > race.getHorseWinner().getSpeed()) {
      race.setJockeyWinner(horse.getJockeyName());
      race.setSecondPlace(race.getHorseWinner());
      race.setHorseWinner(horse);
    }
  };
}
