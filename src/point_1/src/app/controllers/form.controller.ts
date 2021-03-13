import { Form } from '../models/Form';
import { Horse } from '../models/Horse';
import { Jockey } from '../models/Jockey';
import { Race } from '../models/Race';
import { Utils } from './utils.controller';

export class FormController {
  private form: Form;
  private horseList: Array<Horse>;
  private raceList: Array<Race>;
  private limit: number;

  constructor() {
    this.form = new Form();
    this.horseList = new Array<Horse>(4);
    this.raceList = new Array<Race>(10);
    this.limit = 10;
  }

  start = (): void => {
    let i = 0;
    this.form.getHorseForm()?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      i = this.registerHorse(i);
    });

    let raceIndex = 0;
    let horseIndex = 0;
    const race = new Race();
    race.setId(parseInt(this.form.getRaceId()?.value));
    this.form.getRaceForm()?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (horseIndex >= 4) {
        console.log(`Horse index: ${horseIndex}`);
        const race = new Race();
        race.setId(parseInt(this.form.getRaceId()?.value));
        console.log(this.raceList[raceIndex].getHorseWinner());
        this.raceList[raceIndex].getHorseWinner().addWin();
        this.raceList[raceIndex].getHorseWinner().getJockey().addWin();
        horseIndex = 0;
        raceIndex++;
      }
      if (this.registerRace(race, raceIndex, horseIndex)) horseIndex++;
      // console.log(horseIndex + 0);
    });
  };

  registerHorse = (i: number) => {
    if (i >= 4) {
      alert('No se pueden registrar más caballos');
      return i;
    }
    if (!this.wasHorseAdded(i)) return i;
    this.form.getHorseForm()?.reset();
    return ++i;
  };

  wasHorseAdded = (i: number): boolean => {
    const name = (<HTMLInputElement>document.getElementById('horseName'))?.value;
    if (!Utils.isUnique(name, this.horseList)) {
      alert('Nombre del caballo ya registrado');
      return false;
    }

    // Create new Horse object and add it to the list.
    const horse = new Horse();
    horse.setName(name);
    horse.setWeight(
      parseFloat((<HTMLInputElement>document.getElementById('horseWeight'))?.value),
    );
    horse.setAge(parseInt((<HTMLInputElement>document.getElementById('horseAge'))?.value));
    horse.setBreed((<HTMLInputElement>document.getElementById('horseBreed'))?.value);
    // console.log(horse);
    this.horseList[i] = horse; // 1, 2, 3, 4 O(1)
    if (this.horseList[i - 1] && horse.getAge() < this.horseList[i - 1].getAge()) {
      Utils.quickSort(this.horseList, 0, i);
    }
    this.showHorsesList();
    return true;
  };

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

  registerRace = (race: Race, raceIndex: number, horseIndex: number): boolean => {
    if (raceIndex > this.limit) {
      alert('No se pueden registrar más carreras');
      return false;
    } else {
      if (!this.addHorseToRace(race, raceIndex, horseIndex)) return false;
      this.form.getRaceForm()?.reset();
      this.form.getRaceId() &&
        (this.form.getRaceId().value =
          raceIndex >= this.limit ? 'Límite' : (raceIndex + 1).toString());
    }
    return true;
  };

  addHorseToRace = (race: Race, raceIndex: number, horseIndex: number): boolean => {
    // Create horse
    const horse = Utils.findHorse(
      (<HTMLInputElement>document.getElementById('nameList'))?.value,
      this.horseList,
    );
    // Check if horse race log was already sended
    console.log(`Race index: ${raceIndex}`);

    if (this.raceList[raceIndex]) {
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
    console.log(horse);
    race.addHorseAt(horseIndex, horse || new Horse());
    Utils.selectWinners(horse || new Horse(), race);
    this.raceList[raceIndex] = race;
    return true;
  };
}
