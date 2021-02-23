import { Tag } from './classes';
import { createHtmlTag } from './create-filters-tags';
import { tagsList, placesList } from '../index';
import { printTableRow, cleanTable } from './print-table';

const inputNumber = document.querySelector('#js-puesto');
const selectPlace = document.querySelector('#selectPlace');
const selectSubject = document.querySelector('#selectSubject');
const selectCenter = document.querySelector('#selectCenter');
const htmlTagsList = document.querySelector('#js-applied-filters-list');
const htmlClearTags = document.querySelector('.clear');
const tableBody = document.getElementById('js-table-body');

export const events = () => {
  // Events tags
  inputNumber.addEventListener('change', () => {
    const newTag = new Tag(inputNumber.value, 'number');
    tagsList.addTag(newTag);
    createHtmlTag(newTag, 'number');
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
  });

  selectPlace.addEventListener('change', () => {
    const newTag = new Tag(selectPlace.value, 'place');
    tagsList.addTag(newTag);
    createHtmlTag(newTag, 'place');
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
  });

  selectSubject.addEventListener('change', () => {
    const newTag = new Tag(selectSubject.value, 'subject');
    tagsList.addTag(newTag);
    createHtmlTag(newTag, 'subject');
    console.log(tagsList);
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
  });

  selectCenter.addEventListener('change', () => {
    const newTag = new Tag(selectCenter.value, 'center');
    tagsList.addTag(newTag);
    createHtmlTag(newTag, 'center');
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
  });

  htmlTagsList.addEventListener('click', (event) => {
    if (event.target.id === 'js-delete-tag') {
      tagsList.deleteTag(event.target.getAttribute('data-id'));
      event.target.parentNode.parentNode.remove();
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
  });

  htmlClearTags.addEventListener('click', () => {
    tagsList.deleteAllTags();
    htmlTagsList.children[0].innerHTML = '';
    htmlTagsList.children[1].innerHTML = '';
    htmlTagsList.children[2].innerHTML = '';
    placesList.resetInitialPlaces();
  });

  // Events places list
  tableBody.addEventListener('click', (event) => {
    if (event.target.id === 'js-delete-row') {
      placesList.deletePlace(event.target.getAttribute('data-id'));
      event.target.parentNode.remove();
    }
  });
};
