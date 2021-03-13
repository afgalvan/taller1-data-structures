class TableController {
  start = () => {
    this.loadTitle();
  };

  loadTitle = () => {
    const title = document.getElementById('headTitle');
    title?.removeAttribute('hidden');
  };
}

export { TableController };
