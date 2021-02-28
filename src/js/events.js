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
const tagsContainer = document.querySelector('.applied-filters-list__tags');
const htmlClearAll = document.querySelector('#js-clearall');
const htmlFiltersAside = document.querySelector('#js-aside');
const htmlFiltersBtn = document.querySelector('#js-hide-aside');
const htmlFiltersClose = document.querySelector('#js-closeFilters');

export const events = () => {
  // Events tags
  inputNumber.addEventListener('change', () => {
    if (tagsList.tags.length) {
      if (!tagsList.tags.filter((element) => element.val === inputNumber.value).length > 0) {
        const newTag = new Tag(inputNumber.value, 'number');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'number');
      }
    } else {
      const newTag = new Tag(inputNumber.value, 'number');
      tagsList.addTag(newTag);
      createHtmlTag(newTag, 'number');
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
    if (htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
  });

  selectPlace.addEventListener('change', () => {
    if (tagsList.tags.length) {
      if (!tagsList.tags.filter((element) => element.val === selectPlace.value).length > 0) {
        const newTag = new Tag(selectPlace.value, 'place');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'place');
      }
    } else {
      const newTag = new Tag(selectPlace.value, 'place');
      tagsList.addTag(newTag);
      createHtmlTag(newTag, 'place');
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
    if (htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
  });

  selectSubject.addEventListener('change', () => {
    if (tagsList.tags.length) {
      if (!tagsList.tags.filter((element) => element.val === selectSubject.value).length > 0) {
        const newTag = new Tag(selectSubject.value, 'subject');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'subject');
      }
    } else {
      const newTag = new Tag(selectSubject.value, 'subject');
      tagsList.addTag(newTag);
      createHtmlTag(newTag, 'subject');
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
    if (htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
  });

  selectCenter.addEventListener('change', () => {
    if (tagsList.tags.length) {
      if (!tagsList.tags.filter((element) => element.val === selectCenter.value).length > 0) {
        const newTag = new Tag(selectCenter.value, 'center');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'center');
      }
    } else {
      const newTag = new Tag(selectCenter.value, 'center');
      tagsList.addTag(newTag);
      createHtmlTag(newTag, 'center');
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);
    if (htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
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
    if (tagsList.tags.length < 1) {
      htmlClearAll.classList.add('u-hide');
    }
  });

  htmlClearTags.addEventListener('click', () => {
    tagsList.deleteAllTags();
    const elements = tagsContainer.getElementsByClassName('applied-filter');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    console.log(tagsContainer.children);
    htmlClearAll.classList.add('u-hide');
    placesList.resetInitialPlaces();
  });

  // Events places list
  tableBody.addEventListener('click', (event) => {
    if (event.target.id === 'js-delete-row') {
      placesList.deletePlace(event.target.getAttribute('data-id'));
      event.target.parentNode.remove();
    }
  });

  // Events ui
  htmlFiltersBtn.addEventListener('click', () => {
    if (htmlFiltersAside.classList.contains('u-hide')) {
      console.log('ver');
      htmlFiltersBtn.innerText = 'Ver filtros';
    } else {
      htmlFiltersBtn.innerText = 'Ocultar filtros';
    }
    htmlFiltersAside.classList.toggle('u-hide');
  });

  htmlFiltersClose.addEventListener('click', () => {
    htmlFiltersAside.classList.toggle('u-hide');
  });
};
