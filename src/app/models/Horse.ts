export class Horse {
  name: string;
  weight: number;
  age: number;
  breed: string;
  speed: number;

  constructor(name?: string, weight?: number, age?: number, breed?: string) {
    this.name = name || '';
    this.weight = weight || 0;
    this.age = age || 0;
    this.breed = breed || '';
    this.speed = 0;
  }
}
