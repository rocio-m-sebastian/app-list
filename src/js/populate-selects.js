const selectPlace = document.querySelector('#selectPlace');
const selectSubject = document.querySelector('#selectSubject');
const selectCenter = document.querySelector('#selectCenter');

const removeDuplicates = (array) => {
  const result = array.filter((a, b) => array.indexOf(a) === b);
  return result.sort();
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
  createCheckboxes(getSubjects(), selectSubject);
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
  createCheckboxes(getCenters(), selectCenter);
};

export {
  createSelectOptionsCities,
  createSelectOptionsSubjects,
  createSelectOptionsCenters,
};
