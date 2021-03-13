export class Table {
  private content: HTMLTableElement;

  constructor(tableId: string) {
    this.content = <HTMLTableElement>document.getElementById(tableId);
  }

  public getContent(): HTMLTableElement {
    return this.content;
  }

  public setContent(self: HTMLTableElement): void {
    this.content = self;
  }

  public addRowAt(index: number, data: string[]): void {
    const row = this.content.insertRow(index);
    for (let i = 0; i < data.length; ++i) {
      const cell = row.insertCell(i);
      cell.innerHTML = data[i];
    }
  }
}
