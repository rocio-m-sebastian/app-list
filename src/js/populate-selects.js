const selectPlace = document.querySelector('#selectPlace');
const selectSubject = document.querySelector('#selectSubject');
const selectCenter = document.querySelector('#selectCenter');

const removeDuplicates = (array) => {
  const result = array.filter((a, b) => array.indexOf(a) === b);
  return result.sort();
};

const createSelectOptions = (array, select) => {
  array.forEach((element) => {
    const optionElement = document.createElement('option');
    optionElement.innerHTML = element;
    select.appendChild(optionElement);
  });
};

const createCheckboxes = (array, container) => {
  array.forEach((element) => {
    const checkElement = `
    <input type="checkbox" id="${element}" name="${element}" value="${element}">
    <label for="${element}">${element}</label>`;
    const wrapperCheckElement = document.createElement('div');
    wrapperCheckElement.innerHTML = checkElement;
    container.appendChild(wrapperCheckElement);
  });
};

const createSelectFirstOption = (select, label) => {
  const optionElement = document.createElement('option');
  optionElement.innerHTML = label;
  optionElement.setAttribute('disabled', true);
  optionElement.setAttribute('selected', true);
  select.prepend(optionElement);
};

// select CITIES
const getListCities = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  const cities = list.map((element) => {
    return element.localidad;
  });
  return cities;
};

const getCities = () => {
  return removeDuplicates(getListCities());
};

const createSelectOptionsCities = () => {
  createCheckboxes(getCities(), selectPlace);
};

// select SUBJECTS
const getListSubjects = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  const subjects = list.map((element) => {
    return element.especialidad;
  });
  return subjects;
};

const getSubjects = () => {
  return removeDuplicates(getListSubjects());
};

const createSelectOptionsSubjects = () => {
  createSelectOptions(getSubjects(), selectSubject);
  createSelectFirstOption(selectSubject, 'Especialidad');
};

// select CENTERS
const getListCenters = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  const centers = list.map((element) => {
    return element.centro.nombre;
  });
  return centers;
};

const getCenters = () => {
  return removeDuplicates(getListCenters());
};

const createSelectOptionsCenters = () => {
  createSelectOptions(getCenters(), selectCenter);
  createSelectFirstOption(selectCenter, 'Centro');
};

export {
  createSelectOptionsCities,
  createSelectOptionsSubjects,
  createSelectOptionsCenters,
};
