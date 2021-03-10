export class Horse {
  private name: string;
  private weight: number;
  private age: number;
  private breed: string;
  private speed: number;

  constructor(name?: string, weight?: number, age?: number, breed?: string) {
    this.name = name || '';
    this.weight = weight || 0;
    this.age = age || 0;
    this.breed = breed || '';
    this.speed = 0;
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

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }
}
