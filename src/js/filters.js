const theData = JSON.parse(window.localStorage.getItem('list'));
const tableBody = document.getElementById('table_body');
const selectorCity = document.getElementById('selectPlace');
const selectorSubject = document.getElementById('selectSubject');
const appliedFilters = [];
const filteredElemnts = [];
let resultElementsSubject = [];
let resultElementsCity = [];
const totalElementsCity = [];
const totalElementsSubject = [];

const printTableRows = (data) => {
  // const data = JSON.parse(window.localStorage.getItem('list'));
  data.forEach((element) => {
    const row = document.createElement('tr');
    const celds = `
    <td class="table-wiew__place p-small">${element.localidad}</td>
    <td class="table-wiew__hospital p-small">${element.centro.nombre}</td>
    <td class="table-wiew__level p-small">${element.centro.nivel}</td>
    <td class="table-wiew__area p-small">${element.especialidad}</td>
    <td class="table-wiew__number p-small">${element.numero}</td>`;
    row.innerHTML = celds;
    tableBody.appendChild(row);
  });
};

const createSelectOptions = (data, filterSelectorName, filterSelector) => {
  const options = data;
  let selectOptions = [];
  options.forEach((option) => {
    if (filterSelectorName === 'subject') {
      const selectOption = option.especialidad;
      selectOptions.push(selectOption);
    } else if (filterSelectorName === 'city') {
      const selectOption = option.localidad;
      selectOptions.push(selectOption);
    }
  });

  function removeDuplicates(array) {
    const result = array.filter((a, b) => array.indexOf(a) === b);
    selectOptions = result;
    return array;
  }
  removeDuplicates(selectOptions);

  selectOptions.forEach((selectOption) => {
    const optionElement = document.createElement('option');
    optionElement.innerHTML = selectOption;
    filterSelector.appendChild(optionElement);
  });
};

const clearTableData = (table) => {
  table.innerHTML = '';
};

const getCommonElements = (elements) => {
  const duplicates = elements.reduce((acc, el, i, arr) => {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  }, []);
  // console.log(duplicates);
  printTableRows(duplicates);
  // console.log(totalElementsCity);
  // console.log(totalElementsSubject);
  // console.log(filteredElemnts);
  // console.log(duplicates);
  // console.log(appliedFilters);
};

//* *****************************************FILTER CITY*********************************  *//
//* ************************************************************************************** *//
const applyFilterCity = (data) => {
  const options = data;
  // When a new <option> is selected
  const optionText = selectorCity.value;
  const appliedFiltersList = document.getElementById('applied-filters-list');
  const appliedFilter = document.createElement('div');
  const appliedFilterClasses = ['applied-filter', 'applied-filter--place', 'u-flex'];
  appliedFilter.classList.add(...appliedFilterClasses);
  const appliedFilterContent = `
  <div>
      <span class="p-small">${optionText}</span>
  </div>`;

  if (!(appliedFilters.indexOf(optionText) >= 0)) {
    appliedFilters.push(optionText);
    appliedFilter.innerHTML = appliedFilterContent;
    appliedFiltersList.appendChild(appliedFilter);

    const filterByCity = () => {
      resultElementsCity = options.filter((element) => element.localidad === optionText);
      return resultElementsCity;
    };

    if (appliedFilters.length) {
      clearTableData(tableBody);
    }
    filterByCity(data);
    totalElementsCity.push(...resultElementsCity);
    filteredElemnts.push(...totalElementsCity);
  }
};

//* *****************************************FILTER SUBJECT******************************  *//
//* ************************************************************************************** *//
const applyFilterSubject = (data) => {
  const options = data;
  // When a new <option> is selected
  const optionText = selectorSubject.value;
  const appliedFiltersList = document.getElementById('applied-filters-list');
  const appliedFilter = document.createElement('div');
  const appliedFilterClasses = ['applied-filter', 'applied-filter--place', 'u-flex'];
  appliedFilter.classList.add(...appliedFilterClasses);
  const appliedFilterContent = `
  <div>
      <span class="p-small">${optionText}</span>
  </div>`;

  if (!(appliedFilters.indexOf(optionText) >= 0)) {
    appliedFilters.push(optionText);
    appliedFilter.innerHTML = appliedFilterContent;
    appliedFiltersList.appendChild(appliedFilter);

    const filterBySubject = () => {
      resultElementsSubject = options.filter((element) => element.especialidad === optionText);
      return resultElementsSubject;
    };

    if (appliedFilters.length) {
      clearTableData(tableBody);
    }
    filterBySubject(data);
    totalElementsSubject.push(...resultElementsSubject);
    filteredElemnts.push(...totalElementsSubject);
  }
};

//* *****************************************APPLY THE FILTERS******************************  *//
//* ***************************************************************************************** *//
const filterAll = () => {
  if (totalElementsCity.length && totalElementsSubject.length) {
    // console.log('city and subject elements');
    // console.log('totalElementsCity');
    // console.log(totalElementsCity);
    // console.log('totalElementsSubject');
    // console.log(totalElementsSubject);
    console.log('Filtered', filteredElemnts);
    getCommonElements(filteredElemnts);
    console.log('Commons', filteredElemnts);
  } else if (!totalElementsCity.length || !totalElementsSubject.length) {
    printTableRows(filteredElemnts);
  }
};

//* *****************************************EVENT LISTENERS**********************************  *//
//* ******************************************************************************************* *//
selectorCity.addEventListener('change', () => {
  applyFilterCity(theData);
  filterAll();
});

selectorSubject.addEventListener('change', () => {
  applyFilterSubject(theData);
  filterAll();
});

createSelectOptions(theData, 'city', selectorCity);
createSelectOptions(theData, 'subject', selectorSubject);

export {
  printTableRows, createSelectOptions, applyFilterCity, applyFilterSubject,
};
