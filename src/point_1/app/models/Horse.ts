import { Competitor } from './Competitor';
import { Jockey } from './Jockey';

export class Horse extends Competitor {
  private weight: number;
  private age: number;
  private breed: string;
  private jockey: Jockey;
  private speed: number;
  private distance: number;
  private time: number;

  constructor() {
    super();
    this.weight = 0;
    this.age = 0;
    this.breed = '';
    this.jockey = new Jockey();
    this.speed = 0;
    this.distance = 0;
    this.time = 0;
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

  public getJockey(): Jockey {
    return this.jockey;
  }

  public setJockey(jockey: Jockey): void {
    this.jockey = jockey;
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
