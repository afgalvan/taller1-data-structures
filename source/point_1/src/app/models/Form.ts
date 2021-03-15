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

  public getRaceForm(): HTMLFormElement {
    return this.raceForm;
  }

  public getRaceId(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('raceId');
  }

  public getRaceIdValue(): string {
    return this.raceId.value;
  }
}
