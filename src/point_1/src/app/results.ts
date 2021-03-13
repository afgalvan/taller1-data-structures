import { TableController } from './controllers/table.controller';
import '../styles/main.css';

const main = (): void => {
  const table = new TableController();
  table.start();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
