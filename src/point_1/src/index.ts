import { FormController } from './app/controllers/form.controller';
import './styles/main.css';

const main = (): void => {
  const form = new FormController();
  (<HTMLFormElement>document.getElementById('horseLog'))?.reset();
  (<HTMLFormElement>document.getElementById('raceLog'))?.reset();
  (<HTMLInputElement>document.getElementById('raceId')).value = '1';
  form.start();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
