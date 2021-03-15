import { Form } from '../models/Form';
import { Horse } from '../models/Horse';
import { Jockey } from '../models/Jockey';
import { Race } from '../models/Race';
import { Utils } from './utils.controller';
import { TableController } from './table.controller';

export class FormController {
  private form: Form;
  private horseList: Array<Horse>;
  private raceList: Array<Race>;
  private limit: number;
  private horseMVP: Horse;
  private jockeyMVP: Jockey;

  constructor() {
    this.form = new Form();
    this.horseList = new Array<Horse>(4);
    this.raceList = new Array<Race>(10);
    this.limit = 10;
    this.horseMVP = new Horse();
    this.jockeyMVP = new Jockey();
  }

  /**
   * Get the current horses registered in the form.
   * @returns a Horse array.
   */
  getHorseList = (): Array<Horse> => {
    return this.horseList;
  };

  /**
   * Establish the most value horses in all the races.
   * @param horse The most winning horse.
   */
  setHorseMVP = (horse: Horse): void => {
    this.horseMVP = horse;
  };

  /**
   * Establish the most value jockey in all the races.
   * @param jockey The most winning jockey.
   */
  setJockeyMVP = (jockey: Jockey): void => {
    this.jockeyMVP = jockey;
  };

  /**
   * Start the form controller.
   */
  start = (): void => {
    // Reset forms on load or reload
    this.form.getHorseForm().reset();
    this.form.getRaceForm().reset();
    this.form.getRaceId().value = '1';

    // Horse registration
    let i = 0;
    this.form.getHorseForm()?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      i = this.registerHorse(i);
    });

    // Race registration
    let raceIndex = 0;
    let horseIndex = 0;
    const race = new Race();
    race.setId(parseInt(this.form.getRaceId()?.value));
    this.form.getRaceForm()?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (this.registerRace(race, raceIndex, horseIndex)) horseIndex++;

      // Change to the next race registration on horse limit.
      if (horseIndex >= 4) {
        const race = new Race();
        race.setId(parseInt(this.form.getRaceId()?.value));
        this.raceList[raceIndex].getHorseWinner().addWin();
        this.raceList[raceIndex].getHorseWinner().getJockey().addWin();
        horseIndex = 0;
        raceIndex++;
      }

      // Show table results on race limit.
      if (raceIndex >= 3) {
        Utils.evalMVP(this);
        document.getElementById('results')?.classList.remove('hidden');
        document.getElementById('results')?.classList.add('table-display');
        document.getElementById('main')?.classList.add('hidden');
        document.getElementById('main')?.classList.remove('main');
        const table = new TableController(this.raceList, this.horseMVP, this.jockeyMVP);
        table.start();
      }

      this.form.getRaceId() && (this.form.getRaceId().value = (raceIndex + 1).toString());
    });
  };

  /**
   * Register a new horse to the form list.
   * @param i index in the array of horses.
   * @returns the next index if the horse was inserted.
   */
  registerHorse = (i: number): number => {
    if (i >= 4) {
      alert('No se pueden registrar más caballos');
      return i;
    }

    if (!this.wasHorseAdded(i)) return i;
    this.form.getHorseForm()?.reset();
    return ++i;
  };

  /**
   * Check if a horse was inserted in the horse list depending of the valid data.
   * @param i position that supposed to be inserted.
   * @returns if was add or not.
   */
  wasHorseAdded = (i: number): boolean => {
    // Check name uniqueness.
    const name = (<HTMLInputElement>document.getElementById('horseName'))?.value;
    if (!Utils.isUnique(name, this.horseList)) {
      alert('Nombre del caballo ya registrado');
      return false;
    }

    // Create new Horse object and add the attributes from the html form.
    const horse = new Horse();
    horse.setName(name);
    horse.setWeight(
      parseFloat((<HTMLInputElement>document.getElementById('horseWeight'))?.value),
    );
    horse.setAge(parseInt((<HTMLInputElement>document.getElementById('horseAge'))?.value));
    horse.setBreed((<HTMLInputElement>document.getElementById('horseBreed'))?.value);
    this.horseList[i] = horse; // 1, 2, 3, 4 O(1)
    if (this.horseList[i - 1] && horse.getAge() < this.horseList[i - 1].getAge()) {
      Utils.quickSort(this.horseList, 0, i);
    }
    // Update the horseList dropdown to show 'em from younger to older.
    this.showHorsesList();

    return true;
  };

  /**
   *
   */
  showHorsesList = (): void => {
    // Rebuild dropdown section
    const options = document.querySelectorAll('#nameList option');
    options.forEach((o) => o.remove());

    const nameList = <HTMLSelectElement>document.getElementById('nameList');
    // Add to section tag
    this.horseList.forEach((h) => {
      const horseName = document.createElement('option');
      horseName.value = h.getName();
      horseName.innerHTML = h.getName();
      nameList?.appendChild(horseName);
    });
  };

  /**
   * @param race The race object to add all the race register information.
   * @param raceIndex the index of current race from a list of Race.
   * @param horseIndex the index of a list of horse to register in the race.
   * @returns if race input data was valid and successfully registered.
   */
  registerRace = (race: Race, raceIndex: number, horseIndex: number): boolean => {
    if (raceIndex > this.limit) {
      alert('No se pueden registrar más carreras');
      return false;
    } else {
      if (!this.addHorseToRace(race, raceIndex, horseIndex)) return false;
      this.form.getRaceForm()?.reset();
    }

    return true;
  };

  /**
   * @param race
   * @param raceIndex
   * @param horseIndex
   * @returns
   */
  addHorseToRace = (race: Race, raceIndex: number, horseIndex: number): boolean => {
    // Create horse
    const horse = Utils.findHorse(
      (<HTMLInputElement>document.getElementById('nameList'))?.value,
      this.horseList,
    );
    // Check if horse race log was already sended

    if (this.raceList[raceIndex]) {
      console.log(this.raceList[raceIndex]);
      if (!Utils.isUnique(horse?.getName() || '', this.raceList[raceIndex].getHorseList())) {
        alert(`Ya se ha registrado la participación del caballo ${horse?.getName()}`);
        return false;
      }
    }

    const jockey = new Jockey(
      (<HTMLInputElement>document.getElementById('jockeyName'))?.value,
    );
    horse?.setJockey(jockey);
    horse?.setDistance(
      parseFloat((<HTMLInputElement>document.getElementById('distance'))?.value),
    );
    horse?.setTime(parseFloat((<HTMLInputElement>document.getElementById('time'))?.value));
    horse?.setSpeed(horse?.getDistance() / horse?.getTime());
    // console.log(horse);
    race.addHorseAt(horseIndex, horse || new Horse());
    Utils.selectWinners(horse || new Horse(), race);
    this.raceList[raceIndex] = race;
    return true;
  };
}
