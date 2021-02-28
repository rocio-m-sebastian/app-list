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

export const placesList = new PlacesList();

export const tagsList = new TagsList();

console.log(indexView({ variable1: 'value' }));

saveListLocalStorage();
// init();
document.addEventListener('DOMContentLoaded', () => {
  createSelectOptionsCities();
  createSelectOptionsSubjects();
  createSelectOptionsCenters();
  tagsList.tags.forEach(createHtmlTag);

  if (tagsList.tags.length >= 1 && htmlClearAll.classList.contains('u-hide')) {
    htmlClearAll.classList.remove('u-hide');
  }

  events();

  tagsList.tags.forEach((e) => {
    if (e.type === 'number') {
      inputNumber.setAttribute('disabled', true);
    }
  });
});
