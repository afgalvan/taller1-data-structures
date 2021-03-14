import { FormController } from './app/controllers/form.controller';
import './styles/main.css';

const main = (): void => {
  const formController = new FormController();
  formController.start();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
