import './styles.scss';

import { init } from './js/print-table';
import { createSelectOptionsCities, createSelectOptionsSubjects, createSelectOptionsCenters } from './js/populate-selects';
// import { addTagPlace } from './js/create-filters-tags';
import { Tag, TagsList } from './js/classes';
import { createHtmlTag } from './js/create-filters-tags';

const selectPlace = document.querySelector('#selectPlace');
const selectSubject = document.querySelector('#selectSubject');
const selectCenter = document.querySelector('#selectCenter');
const htmlTagsList = document.querySelector('#js-applied-filters-list');
const htmlClearTags = document.querySelector('.clear');

const indexView = require('./index.twig');

console.log(indexView({ variable1: 'value' }));

init();
createSelectOptionsCities();
createSelectOptionsSubjects();
createSelectOptionsCenters();
// addTagPlace();
export const tagsList = new TagsList();
tagsList.tags.forEach(createHtmlTag);
console.log(tagsList);

// Events
selectPlace.addEventListener('change', () => {
  const newTag = new Tag(selectPlace.value);
  tagsList.addTag(newTag);
  createHtmlTag(newTag, 'place');
});

selectSubject.addEventListener('change', () => {
  const newTag = new Tag(selectSubject.value);
  tagsList.addTag(newTag);
  createHtmlTag(newTag, 'subject');
});

selectCenter.addEventListener('change', () => {
  const newTag = new Tag(selectCenter.value);
  tagsList.addTag(newTag);
  createHtmlTag(newTag, 'center');
});

htmlTagsList.addEventListener('click', (event) => {
  if (event.target.id === 'js-delete-tag') {
    tagsList.deleteTag(event.target.getAttribute('data-id'));
    event.target.parentNode.parentNode.remove();
  }
});

htmlClearTags.addEventListener('click', () => {
  tagsList.deleteAllTags();
  console.log(htmlTagsList.children[0]);
  htmlTagsList.children[0].innerHTML = '';
  htmlTagsList.children[1].innerHTML = '';
  htmlTagsList.children[2].innerHTML = '';
});
