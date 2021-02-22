// import { saveListLocalStorage, getListLocalStorage } from './save-localstorage';
// import { placesList } from '../index';

const tableBody = document.getElementById('js-table-body');

const printTableRow = (element) => {
  // console.log(element);
  const row = document.createElement('tr');
  const celds = `
  <td class="table-wiew__place p-small">${element.localidad}</td>
  <td class="table-wiew__hospital p-small">${element.centro.nombre}</td>
  <td class="table-wiew__level p-small">${element.centro.nivel}</td>
  <td class="table-wiew__area p-small">${element.especialidad}</td>
  <td class="table-wiew__number p-small">${element.numero}</td>
  <td class="table-wiew__number p-small" id="js-delete-row" data-id="${element.numero}">x</td>`;
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
