import { Competitor } from './Competitor';

export class Jockey extends Competitor{
  constructor(name?: string) {
    super(name || '');
  }
}
