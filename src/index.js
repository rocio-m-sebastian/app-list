import './styles.scss';

import { PlacesList, TagsList } from './js/classes';
import { createHtmlTag } from './js/create-filters-tags';
import { events } from './js/events';
import { createSelectOptionsCities, createSelectOptionsSubjects, createSelectOptionsCenters } from './js/populate-selects';

// const indexView = require('./index.twig');
// console.log(indexView({ variable1: 'value' }));

const inputNumber = document.querySelector('#js-puesto');

const htmlClearAll = document.querySelector('#js-clearall');

export const tagsList = new TagsList();
export const placesList = new PlacesList();

document.addEventListener('DOMContentLoaded', () => {
  events();
  createSelectOptionsCities();
  createSelectOptionsSubjects();
  createSelectOptionsCenters();
  tagsList.tags.forEach(createHtmlTag);
  tagsList.tags.forEach((tag) => {
    const inputsList = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < inputsList.length; i += 1) {
      if (inputsList[i].value === tag.val) {
        inputsList[i].checked = true;
        inputsList[i].disabled = true;
      }
    }
  });

  if (tagsList.tags.length >= 1 && htmlClearAll.classList.contains('u-hide')) {
    htmlClearAll.classList.remove('u-hide');
  }

  tagsList.tags.forEach((e) => {
    if (e.type === 'number') {
      inputNumber.setAttribute('disabled', true);
    }
  });
});
