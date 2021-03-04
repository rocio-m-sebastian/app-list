import { Tag } from './classes';
import { createHtmlTag } from './create-filters-tags';
import { tagsList, placesList } from '../index';
import { printTableRow, cleanTable } from './print-table';
import { doScrolling } from './scrollTo';
import { setSticky } from './sticky';
import { showBtn } from './showBtn';

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
const htmlHeader = document.querySelector('#js-menu');
const htmlMenuClose = document.querySelector('#js-closeMenu');
const htmlMenuHmburger = document.querySelector('#js-hamburger');
const htmlBtnGolist = document.querySelector('#js-golist');
const htmlBtnTop = document.querySelector('#js-btn-top');
const htmlLinkHow = document.querySelector('#js-link-how');
const htmlLinkList = document.querySelector('#js-link-list');
const htmlShowPlaces = document.querySelector('#js-showPlaces');
const htmlShowSubjects = document.querySelector('#js-showSubjects');
const htmlShowCenters = document.querySelector('#js-showCenters');

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

  const filterPaces = () => {
    if (tagsList.tags.length) {
      const checkboxes = selectPlace.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (!tagsList.tags.filter((element) => element.val === checkboxes[i].value).length > 0) {
          const newTag = new Tag(checkboxes[i].value, 'place');
          tagsList.addTag(newTag);
          createHtmlTag(newTag, 'place');
        }
        checkboxes[i].disabled = true;
      }
    } else {
      const checkboxes = selectPlace.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        const newTag = new Tag(checkboxes[i].value, 'place');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'place');
        checkboxes[i].disabled = true;
      }
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);

    if (tagsList.tags.length && htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
  };

  const filterSubjects = () => {
    if (tagsList.tags.length) {
      const checkboxes = selectSubject.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (!tagsList.tags.filter((element) => element.val === checkboxes[i].value).length > 0) {
          const newTag = new Tag(checkboxes[i].value, 'subject');
          tagsList.addTag(newTag);
          createHtmlTag(newTag, 'subject');
        }
        checkboxes[i].disabled = true;
      }
    } else {
      const checkboxes = selectSubject.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        const newTag = new Tag(checkboxes[i].value, 'subject');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'subject');
        checkboxes[i].disabled = true;
      }
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
  };

  const filterCenters = () => {
    if (tagsList.tags.length) {
      const checkboxes = selectCenter.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (!tagsList.tags.filter((element) => element.val === checkboxes[i].value).length > 0) {
          const newTag = new Tag(checkboxes[i].value, 'center');
          tagsList.addTag(newTag);
          createHtmlTag(newTag, 'center');
        }
        checkboxes[i].disabled = true;
      }
    } else {
      const checkboxes = selectCenter.querySelectorAll('input[type=checkbox]:checked');
      for (let i = 0; i < checkboxes.length; i += 1) {
        const newTag = new Tag(checkboxes[i].value, 'center');
        tagsList.addTag(newTag);
        createHtmlTag(newTag, 'center');
        checkboxes[i].disabled = true;
      }
    }
    // filter by tags
    placesList.resetInitialPlaces();
    const initialPlaces = placesList;
    initialPlaces.filter(tagsList);
    cleanTable();
    initialPlaces.places.forEach(printTableRow);

    if (tagsList.tags.length && htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
  };

  htmlFiltersClose.addEventListener('click', () => {
    htmlFiltersAside.classList.toggle('u-hide');
    filterPaces();
    filterCenters();
    filterSubjects();
    htmlFiltersBtn.innerText = 'Ver filtros';
  });

  htmlTagsList.addEventListener('click', (event) => {
    if (event.target.id === 'js-delete-tag') {
      tagsList.deleteTag(event.target.getAttribute('data-id'));
      const name = event.target.getAttribute('data-name');
      event.target.parentNode.parentNode.remove();
      const inputsList = document.querySelectorAll('input[type="checkbox"]');
      for (let i = 0; i < inputsList.length; i += 1) {
        if (inputsList[i].value === name) {
          inputsList[i].checked = false;
          inputsList[i].disabled = false;
        }
      }
      document.querySelectorAll('input[type="number"]').checked = false;
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
    const inputsList = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < inputsList.length; i += 1) {
      inputsList[i].checked = false;
      inputsList[i].disabled = false;
    }
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
      htmlFiltersBtn.innerText = 'Ocultar filtros';
    } else {
      htmlFiltersBtn.innerText = 'Ver filtros';
    }
    htmlFiltersAside.classList.toggle('u-hide');
  });

  /* htmlFiltersClose.addEventListener('click', () => {
    htmlFiltersAside.classList.toggle('u-hide');
  }); */

  htmlMenuClose.addEventListener('click', () => {
    htmlHeader.classList.toggle('u-hide');
  });

  htmlMenuHmburger.addEventListener('click', () => {
    htmlHeader.classList.toggle('u-hide');
  });
};

htmlBtnGolist.addEventListener('click', doScrolling.bind(null, '#js-table', 1000));

htmlBtnTop.addEventListener('click', doScrolling.bind(null, '#js-tableview', 1000));

htmlLinkList.addEventListener('click', () => {
  doScrolling('#js-table', 1000);
  htmlHeader.classList.toggle('u-hide');
  console.log('list');
});

htmlLinkHow.addEventListener('click', () => {
  htmlHeader.classList.toggle('u-hide');
  doScrolling('#js-section-how', 1000);
});

window.onscroll = () => {
  setSticky();
  showBtn();
};

htmlShowPlaces.addEventListener('click', () => {
  selectPlace.classList.toggle('u-hide');
});

htmlShowSubjects.addEventListener('click', () => {
  selectSubject.classList.toggle('u-hide');
});

htmlShowCenters.addEventListener('click', () => {
  selectCenter.classList.toggle('u-hide');
});
