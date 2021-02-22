import './styles.scss';

// import { init } from './js/print-table';
import { saveListLocalStorage } from './js/save-localstorage';
import { createSelectOptionsCities, createSelectOptionsSubjects, createSelectOptionsCenters } from './js/populate-selects';
import { TagsList, PlacesList } from './js/classes';
import { createHtmlTag } from './js/create-filters-tags';
import { events } from './js/events';

const indexView = require('./index.twig');

console.log(indexView({ variable1: 'value' }));

saveListLocalStorage();
// init();
createSelectOptionsCities();
createSelectOptionsSubjects();
createSelectOptionsCenters();
// addTagPlace();
export const tagsList = new TagsList();
tagsList.tags.forEach(createHtmlTag);
// console.log(tagsList);
events();

export const placesList = new PlacesList();

// init();
