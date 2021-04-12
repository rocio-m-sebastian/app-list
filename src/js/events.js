import { Tag } from './classes';
import { createHtmlTag } from './create-filters-tags';
import { tagsList, placesList } from '../index';
import { printTableRow, cleanTable } from './print-table';
import { doScrolling } from './scrollTo';
import { setSticky } from './sticky';
import { showBtn } from './showBtn';
import { createSelectOptionsCenters } from './populate-selects';

const inputNumber = document.querySelector('#js-puesto');
const selectPlace = document.querySelector('#selectPlace');
const selectSubject = document.querySelector('#selectSubject');
const selectCenter = document.querySelector('#selectCenter');
const htmlTagsList = document.querySelector('#js-applied-filters-list');
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
const htmlFilterPlace = document.querySelector('#js-filter-place');
const htmlFilterSubject = document.querySelector('#js-filter-subject');
const htmlFilterCenter = document.querySelector('#js-filter-center');
const htmlSpinner = document.querySelector('.table-wiew__spinner');
const htmlLastTableRow = document.querySelector('.table-wiew__last');

const initPlaces = () => {
  placesList.resetInitialPlaces();
  const initialPlaces = placesList;
  initialPlaces.filter(tagsList);
  cleanTable();

  const printData = () => {
    const start = performance.now();
    console.log('places', initialPlaces.places);
    if (initialPlaces.places.length) {
      initialPlaces.places.forEach(printTableRow);
    } else {
      const message = `
        <td colspan="4" style="height: 300px;">No hay resultados para esta búsqueda. </br>Prueba otra combinación de filtros.</td>
      `;
      tableBody.innerHTML = message;
      console.log(htmlLastTableRow);
      htmlLastTableRow.classList.add('u-hide');
    }
    const end = performance.now();
    console.log(end - start);
  };

  const start = async() => {
    await printData();
    htmlSpinner.classList.add('u-hide');
    if (initialPlaces.places.length) {
      htmlLastTableRow.classList.remove('u-hide');
    }
  };

  start();
};

const checkedFiltersToTags = (inputType, val) => {
  if (tagsList.tags.length) {
    const checkboxes = inputType.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (!tagsList.tags.filter((element) => element.val === checkboxes[i].value).length > 0) {
        const newTag = new Tag(checkboxes[i].value, val);
        tagsList.addTag(newTag);
        createHtmlTag(newTag, val);
      }
      checkboxes[i].disabled = true;
    }
  } else {
    const checkboxes = inputType.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkboxes.length; i += 1) {
      const newTag = new Tag(checkboxes[i].value, val);
      tagsList.addTag(newTag);
      createHtmlTag(newTag, val);
      checkboxes[i].disabled = true;
    }
  }
};

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
    initPlaces();
  });

  const filterPlaces = () => {
    checkedFiltersToTags(selectPlace, 'place');
    // filter by tags
    initPlaces();
  };

  const filterSubjects = () => {
    checkedFiltersToTags(selectSubject, 'subject');
    // filter by tags
    initPlaces();
  };

  const filterCenters = () => {
    checkedFiltersToTags(selectCenter, 'center');
    // filter by tags
    initPlaces();
  };

  htmlFiltersClose.addEventListener('click', () => {
    htmlFiltersAside.classList.toggle('u-hide');
    filterPlaces();
    filterSubjects();
    filterCenters();
    if (tagsList.tags.length && htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
    htmlFiltersBtn.innerText = 'Ver filtros';
    if (tagsList.tags.length && htmlClearAll.classList.contains('u-hide')) {
      htmlClearAll.classList.remove('u-hide');
    }
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
      // filter by tags
      initPlaces();

      if (tagsList.tags.length < 1) {
        htmlClearAll.classList.add('u-hide');
      }
    }
  });

  htmlClearAll.addEventListener('click', () => {
    tagsList.deleteAllTags();
    const elements = tagsContainer.getElementsByClassName('applied-filter');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    htmlClearAll.classList.add('u-hide');
    initPlaces();
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
      event.target.parentNode.classList.add('u-hidden');
      setTimeout(() => {
        event.target.parentNode.remove();
      }, 500);
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

  htmlMenuClose.addEventListener('click', () => {
    htmlHeader.classList.toggle('active');
  });

  htmlMenuHmburger.addEventListener('click', () => {
    htmlHeader.classList.toggle('active');
  });
};

htmlBtnGolist.addEventListener('click', doScrolling.bind(null, '#js-table', 1000));

htmlBtnTop.addEventListener('click', doScrolling.bind(null, '#js-tableview', 1000));

htmlLinkList.addEventListener('click', () => {
  doScrolling('#js-table', 1000);
  htmlHeader.classList.toggle('active');
});

htmlLinkHow.addEventListener('click', () => {
  htmlHeader.classList.toggle('active');
  doScrolling('#js-section-how', 1000);
});

window.onscroll = () => {
  setSticky();
  showBtn();
};

htmlFilterSubject.addEventListener('click', () => {
  selectSubject.classList.toggle('active');
  htmlFilterSubject.classList.toggle('u-active');
  selectPlace.classList.remove('active');
  htmlFilterPlace.classList.remove('u-active');
  selectCenter.classList.remove('active');
  htmlFilterCenter.classList.remove('u-active');
});

htmlFilterPlace.addEventListener('click', () => {
  selectPlace.classList.toggle('active');
  htmlFilterPlace.classList.toggle('u-active');
  selectSubject.classList.remove('active');
  htmlFilterSubject.classList.remove('u-active');
  selectCenter.classList.remove('active');
  htmlFilterCenter.classList.remove('u-active');
});

htmlFilterCenter.addEventListener('click', () => {
  createSelectOptionsCenters();
  selectCenter.classList.toggle('active');
  htmlFilterCenter.classList.toggle('u-active');
  selectPlace.classList.remove('active');
  htmlFilterPlace.classList.remove('u-active');
  selectSubject.classList.remove('active');
  htmlFilterSubject.classList.remove('u-active');
});
