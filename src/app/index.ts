import { Form } from './models/Form';
import '../styles/main.css';

const main = (): void => {
  const form = new Form();
  form.start();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  (<HTMLFormElement>document.getElementById('horseLog'))?.reset();
  (<HTMLFormElement>document.getElementById('raceLog'))?.reset();
} else {
  main();
}
