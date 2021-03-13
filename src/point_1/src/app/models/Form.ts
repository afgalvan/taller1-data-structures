export class Form {
  private horseForm: HTMLFormElement;
  private raceForm: HTMLFormElement;
  private raceId: HTMLInputElement;

  constructor() {
    this.horseForm = <HTMLFormElement>document.getElementById('horseLog') || undefined;
    this.raceForm = <HTMLFormElement>document.getElementById('raceLog') || undefined;
    this.raceId = <HTMLInputElement>document.getElementById('raceId') || undefined;
  }

  public getHorseForm(): HTMLFormElement {
    return this.horseForm;
  }

  public setHorseForm(horseForm: HTMLFormElement): void {
    this.horseForm = horseForm;
  }

  public getRaceForm(): HTMLFormElement {
    return this.raceForm;
  }

  public setRaceForm(raceForm: HTMLFormElement): void {
    this.raceForm = raceForm;
  }

  public getRaceId(): HTMLInputElement {
    return this.raceId;
  }

  public setRaceId(raceId: HTMLInputElement): void {
    this.raceId = raceId;
  }
}
