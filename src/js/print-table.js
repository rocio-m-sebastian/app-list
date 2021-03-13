// import { saveListLocalStorage, getListLocalStorage } from './save-localstorage';
// import { placesList } from '../index';

const tableBody = document.getElementById('js-table-body');

const printTableRow = (element) => {
  // console.log(element);
  const row = document.createElement('tr');
  const celds = `
  <td class="table-wiew__number p-small">${element.numero}</td>
  <td class="table-wiew__area p-small">${element.especialidad}</td>
  <td class="table-wiew__hospital p-small">${element.centro}</td>
  <td class="table-wiew__place p-small">${element.localidad}</td>
  <td class="table-wiew__delete p-small u-close" id="js-delete-row" data-id="${element.numero}">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>
  </td>`;
  row.innerHTML = celds;
  tableBody.appendChild(row);
};

const cleanTable = () => {
  tableBody.innerHTML = '';
};

// export const init = async() => {
// saveListLocalStorage();
// (await getListLocalStorage()).forEach(printTableRow);
// (await getData()).forEach(printTableRow);
// };

export {
  printTableRow,
  cleanTable,
};
