export class Horse {
  private name: string;
  private weight: number;
  private age: number;
  private breed: string;
  private jockeyName: string;
  private speed: number;
  private distance: number;
  private time: number;

  constructor(name?: string, weight?: number, age?: number, breed?: string) {
    this.name = name || '';
    this.weight = weight || 0;
    this.age = age || 0;
    this.breed = breed || '';
    this.jockeyName = '';
    this.speed = 0;
    this.distance = 0;
    this.time = 0;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getWeight(): number {
    return this.weight;
  }

  public setWeight(weight: number): void {
    this.weight = weight;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    this.age = age;
  }

  public getBreed(): string {
    return this.breed;
  }

  public setBreed(breed: string): void {
    this.breed = breed;
  }

  public getJockeyName(): string {
    return this.jockeyName;
  }

  public setJockeyName(jockeyName: string): void {
    this.jockeyName = jockeyName;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public getDistance(): number {
    return this.distance;
  }

  public setDistance(distance: number): void {
    this.distance = distance;
  }

  public getTime(): number {
    return this.time;
  }

  public setTime(time: number): void {
    this.time = time;
  }
}
