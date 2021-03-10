import { Horse } from '../models/Horse';
import { Race } from '../models/Race';

class Form {
  private horseList: Array<Horse>;
  private raceList: Array<Race>;
  private horseForm?: HTMLFormElement;
  private raceForm?: HTMLFormElement;
  private raceId?: HTMLInputElement;
  private limit: number;

  constructor() {
    this.horseList = new Array<Horse>(10);
    this.raceList = new Array<Race>(10);
    this.horseForm =
      <HTMLFormElement>document.getElementById('horseForm') || undefined;
    this.raceForm =
      <HTMLFormElement>document.getElementById('raceForm') || undefined;
    this.raceId =
      <HTMLInputElement>document.getElementById('raceId') || undefined;
    this.limit = 10;
  }

  start = (): void => {
    let i = 0;
    this.horseForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (!this.wasHorseAdded(i)) return;

      if (i++ > this.limit) {
        alert('No se pueden registrar más caballos');
      } else {
        this.horseForm?.reset();
      }
    });

    let j = 0;
    this.raceForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.addRace(j);
      if (j++ > this.limit) {
        alert('No se pueden registrar más carreras');
      } else {
        this.raceForm?.reset();
        this.raceId &&
          (this.raceId.value = j >= this.limit ? 'Límite' : (j + 1).toString());
      }
    });
  };

  wasHorseAdded = (i: number): boolean => {
    const name = (<HTMLInputElement>document.getElementById('horseName'))
      ?.value;
    if (!this.isUnique(name)) {
      alert('Nombre del caballo ya registrado');
      return false;
    }

    // Create new Horse object and add it to the list.
    const horse = new Horse();
    horse.setName(name);
    horse.setWeight(parseFloat(
      (<HTMLInputElement>document.getElementById('horseWeight'))?.value,
    ));
    horse.setAge(parseInt(
      (<HTMLInputElement>document.getElementById('horseAge'))?.value,
    ));
    horse.setBreed((<HTMLInputElement>(
      document.getElementById('horseBreed')
    ))?.value);
    // console.log(horse);
    if (!this.horseList[i - 1] || horse.getAge() >= this.horseList[i - 1].getAge()) {
      this.horseList[i] = horse;
    } else {
      [this.horseList[i], this.horseList[i - 1]] = [
        this.horseList[i - 1],
        horse,
      ];
    }

    // Add to section tag
    const nameList = document.getElementById('nameList');
    const horseName = document.createElement('option');
    horseName.value = i.toString();
    horseName.innerHTML = horse.getName();
    nameList?.appendChild(horseName);
    console.log(this.horseList);

    return true;
  };

  addRace = (i: number): void => {
    const race = new Race();
    race.setId(parseInt(
      (<HTMLInputElement>document.getElementById('raceId'))?.value,
    ));
    race.setJockeyName((<HTMLInputElement>(
      document.getElementById('jockeyName')
    ))?.value);
    const horse = this.horseList.find(
      () => <HTMLInputElement>document.getElementById('nameList'),
    );
    race.setHorse(horse || new Horse());
    race.setDistance(parseFloat(
      (<HTMLInputElement>document.getElementById('distance'))?.value,
    ));
    race.setTime(parseFloat(
      (<HTMLInputElement>document.getElementById('time'))?.value,
    ));
    horse?.setSpeed(race.getDistance() / race.getTime());
    console.log(race);
    this.raceList[i] = race;
  };

  isUnique = (name: string): boolean => {
    for (let i = 0; i < this.horseList.length; i++) {
      if (this.horseList[i] == null) {
        return true;
      }
      if (name === this.horseList[i].getName()) {
        return false;
      }
    }

    return true;
  };

}

export { Form };
