import './styles.scss';

// import { init } from './js/print-table';
import { saveListLocalStorage } from './js/save-localstorage';
import { createSelectOptionsCities, createSelectOptionsSubjects, createSelectOptionsCenters } from './js/populate-selects';
import { TagsList, PlacesList } from './js/classes';
import { createHtmlTag } from './js/create-filters-tags';
import { events } from './js/events';

const indexView = require('./index.twig');

const inputNumber = document.querySelector('#js-puesto');

const htmlClearAll = document.querySelector('#js-clearall');

// const htmlDownloadBtn = document.querySelector('#js-download');

// const elementToConvert = document.querySelector('.three-columns');

console.log(indexView({ variable1: 'value' }));

saveListLocalStorage();
// init();
createSelectOptionsCities();
createSelectOptionsSubjects();
createSelectOptionsCenters();
// addTagPlace();
export const tagsList = new TagsList();
tagsList.tags.forEach(createHtmlTag);
if (tagsList.tags.length >= 1 && htmlClearAll.classList.contains('u-hide')) {
  htmlClearAll.classList.remove('u-hide');
}
// console.log(tagsList);
events();

export const placesList = new PlacesList();

tagsList.tags.forEach((e) => {
  if (e.type === 'number') {
    inputNumber.setAttribute('disabled', true);
  }
});
// init();

// document.addEventListener('DOMContentLoaded', () => {});
