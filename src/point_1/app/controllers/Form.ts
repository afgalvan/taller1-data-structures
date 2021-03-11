import { Horse } from '../models/Horse';
import { Race } from '../models/Race';
import { Utils } from './Utils';

class Form {
  private horseList: Array<Horse>;
  private raceList: Array<Race>;
  private horseForm?: HTMLFormElement;
  private raceForm?: HTMLFormElement;
  private raceId?: HTMLInputElement;
  private limit: number;

  constructor() {
    this.horseList = new Array<Horse>(4);
    this.raceList = new Array<Race>(10);
    this.horseForm = <HTMLFormElement>document.getElementById('horseLog') || undefined;
    this.raceForm = <HTMLFormElement>document.getElementById('raceLog') || undefined;
    this.raceId = <HTMLInputElement>document.getElementById('raceId') || undefined;
    this.limit = 10;
  }

  start = (): void => {
    let i = 0;
    this.horseForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      if (i >= 4) {
        alert('No se pueden registrar más caballos');
      } else {
        if (!this.wasHorseAdded(i)) return;
        this.horseForm?.reset();
        i++;
      }
    });

    let raceIndex = 0;
    let horseIndex = 0;
    this.raceForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      if (horseIndex++ > 4) {
        console.log(this.raceList[raceIndex].getHorseWinner());
        horseIndex = 0;
        raceIndex++;
      }
      if (raceIndex > this.limit) {
        alert('No se pueden registrar más carreras');
      } else {
        this.addHorseToRace(raceIndex, horseIndex);
        this.raceForm?.reset();
        this.raceId &&
          (this.raceId.value =
            raceIndex >= this.limit ? 'Límite' : (raceIndex + 1).toString());
      }
    });
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
    if (!this.horseList[i - 1] || horse.getAge() >= this.horseList[i - 1].getAge()) {
      this.horseList[i] = horse;
    } else {
      [this.horseList[i], this.horseList[i - 1]] = [this.horseList[i - 1], horse];
    }

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

    return true;
  };

  addHorseToRace = (raceIndex: number, horseIndex: number): void => {
    const race = new Race();
    race.setId(parseInt((<HTMLInputElement>document.getElementById('raceId'))?.value));

    // Create horse
    const horse = Utils.findHorse(
      (<HTMLInputElement>document.getElementById('nameList'))?.value,
      this.horseList,
    );
    // Check if horse race log was already sended
    if (this.raceList[raceIndex]) {
      if (!Utils.isUnique(horse?.getName() || '', this.raceList[raceIndex].getHorseList())) {
        console.log('Brooo');
        alert(`Ya se ha registrado la participación del caballo ${horse?.getName()}`);
        return;
      }
    }
    horse?.setJockeyName((<HTMLInputElement>document.getElementById('jockeyName'))?.value);
    horse?.setDistance(
      parseFloat((<HTMLInputElement>document.getElementById('distance'))?.value),
    );
    horse?.setTime(parseFloat((<HTMLInputElement>document.getElementById('time'))?.value));
    horse?.setSpeed(horse?.getDistance() / horse?.getTime());
    console.log(horse);
    race.addHorseAt(horseIndex, horse || new Horse());
    Utils.selectWinners(horse || new Horse(), race);
    this.raceList[raceIndex] = race;
  };
}

export { Form };
