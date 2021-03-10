import { Horse } from './Horse';
import { Race } from './Race';

class Form {
  horseList: Array<Horse>;
  raceList: Array<Race>;
  horseLog?: HTMLFormElement;
  raceLog?: HTMLFormElement;
  raceId?: HTMLInputElement;
  limit: number;

  constructor() {
    this.horseList = new Array<Horse>(10);
    this.raceList = new Array<Race>(10);
    this.horseLog =
      <HTMLFormElement>document.getElementById('horseLog') || undefined;
    this.raceLog =
      <HTMLFormElement>document.getElementById('raceLog') || undefined;
    this.raceId =
      <HTMLInputElement>document.getElementById('raceId') || undefined;
    this.limit = 10;
  }

  start = (): void => {
    let i = 0;
    this.horseLog?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (!this.wasHorseAdded(i)) return;

      if (i++ > this.limit) {
        alert('No se pueden registrar más caballos');
      } else {
        this.horseLog?.reset();
      }
    });

    let j = 0;
    this.raceLog?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.addRace(j);
      if (j++ > this.limit) {
        alert('No se pueden registrar más carreras');
      } else {
        this.raceLog?.reset();
        this.raceId &&
          (this.raceId.value = j >= this.limit ? 'Límite' : (j + 1).toString());
      }
    });
  };

  isUnique = (name: string, horse: Array<Horse>): boolean => {
    for (let i = 0; i < horse.length; i++) {
      if (horse[i] == null) {
        return true;
      }
      if (name === horse[i].name) {
        return false;
      }
    }

    return true;
  };

  wasHorseAdded = (i: number): boolean => {
    const name = (<HTMLInputElement>document.getElementById('horseName'))
      ?.value;
    if (!this.isUnique(name, this.horseList)) {
      alert('Nombre del caballo ya registrado');
      return false;
    }

    // Create new Horse object and add it to the list.
    const horse = new Horse();
    horse.name = name;
    horse.weight = parseFloat(
      (<HTMLInputElement>document.getElementById('horseWeight'))?.value,
    );
    horse.age = parseInt(
      (<HTMLInputElement>document.getElementById('horseAge'))?.value,
    );
    horse.breed = (<HTMLInputElement>(
      document.getElementById('horseBreed')
    ))?.value;
    // console.log(horse);
    if (!this.horseList[i - 1] || horse.age >= this.horseList[i - 1].age) {
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
    horseName.innerHTML = horse.name;
    nameList?.appendChild(horseName);
    console.log(this.horseList);

    return true;
  };

  addRace = (i: number): void => {
    const race = new Race();
    race.id = parseInt(
      (<HTMLInputElement>document.getElementById('raceId'))?.value,
    );
    race.jockeyName = (<HTMLInputElement>(
      document.getElementById('jockeyName')
    ))?.value;
    const horse = this.horseList.find(
      () => <HTMLInputElement>document.getElementById('nameList'),
    );
    race.horse = horse;
    race.distance = parseFloat(
      (<HTMLInputElement>document.getElementById('distance'))?.value,
    );
    race.time = parseFloat(
      (<HTMLInputElement>document.getElementById('time'))?.value,
    );
    console.log(race);
    this.raceList[i] = race;
  };
}

export { Form };
