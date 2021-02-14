import { saveListLocalStorage, getListLocalStorage } from './save-localstorage';

const tableBody = document.getElementById('table_body');

const printTableRow = (element) => {
  const row = document.createElement('tr');
  const celds = `
  <td class="table-wiew__place p-small">${element.localidad}</td>
  <td class="table-wiew__hospital p-small">${element.centro.nombre}</td>
  <td class="table-wiew__level p-small">${element.centro.nivel}</td>
  <td class="table-wiew__area p-small">${element.especialidad}</td>
  <td class="table-wiew__number p-small">${element.numero}</td>`;
  row.innerHTML = celds;
  tableBody.appendChild(row);
};

export const init = async() => {
  saveListLocalStorage();
  (await getListLocalStorage()).forEach(printTableRow);
};
