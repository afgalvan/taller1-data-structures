export abstract class Competitor {
  private name: string;
  private wins: number;

  constructor(name?: string) {
    this.name = name || '';
    this.wins = 0;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getWins(): number {
    return this.wins;
  }

  public addWin(): void {
    this.wins++;
  }
}
