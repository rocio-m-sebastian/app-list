// import { getData } from '../http-service';
// import { Place } from './place.class';
import { saveListLocalStorage } from '../save-localstorage';
import { printTableRow } from '../print-table';
import { createSelectOptionsCities, createSelectOptionsSubjects, createSelectOptionsCenters } from '../populate-selects';

const inputNumber = document.querySelector('#js-puesto');
const htmlSpinner = document.querySelector('.table-wiew__spinner');
const htmlLastTableRow = document.querySelector('.table-wiew__last');
const htmlFiltersBtn = document.querySelector('#js-hide-aside');
const htmlDownloadBtn = document.querySelector('#js-download');
// import { tagsList } from '../../index';

export class PlacesList {
  constructor() {
    // this.places = [];
    this.getSessionStorage();
  }

  addPlace(place) {
    this.places.push(place);
    this.saveSessionStorage();
  }

  deletePlace(numero) {
    const numeroNum = parseInt(numero, 10);
    this.places = this.places.filter((place) => parseInt(place.numero, 10) !== numeroNum);
    this.saveSessionStorage();
  }

  resetInitialPlaces() {
    this.places = [];
    /* const setData = async() => {
      (await getData()).forEach((item) => {
        const row = new Place(item);
        this.places.push(row);
      }); */
    this.places = JSON.parse(localStorage.getItem('list'));
    // };
    // setData();
  }

  filter(tagsList) {
    const tagsVals = [];
    tagsList.tags.forEach((tag) => {
      if (!tagsVals.includes(tag.val)) {
        tagsVals.push(tag.val);
      }
    });
    let position = '';
    tagsList.tags.forEach((e) => {
      if (e.type === 'number') {
        position = e.val;
        inputNumber.setAttribute('disabled', true);
      } else {
        inputNumber.removeAttribute('disabled');
      }
    });
    if (!tagsList.tags.length) {
      inputNumber.removeAttribute('disabled');
    }
    if (tagsVals.length === 1) {
      if (tagsList.tags.some((e) => e.type === 'number')) {
        this.places = this.places.filter(
          (place) => parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else {
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          || tagsVals.indexOf(place.especialidad) >= 0
          || tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      }
    } else if (tagsVals.length > 1) {
      if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'center')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('four types');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'center')) {
        console.log('three types 1');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'center')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('three types 2');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('three types 3');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'center')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('three types 4');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.centro.nombre) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'subject')) {
        console.log('two types 1');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'center')) {
        console.log('two types 2');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.especialidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'center')
         && tagsList.tags.some((e) => e.type === 'place')) {
        console.log('two types 3');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('two types 4');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.especialidad) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('two types 5');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'center')
         && tagsList.tags.some((e) => e.type === 'number')) {
        console.log('two types 6');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.centro.nombre) >= 0
          && parseInt(place.numero, 10) >= parseInt(position, 10),
        );
      } else if (tagsList.tags.some((e) => e.type === 'place')) {
        console.log('one type');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'subject')) {
        console.log('one type');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.especialidad) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'center')) {
        console.log('one type');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      }
    }
    this.saveSessionStorage();
  }

  filterSubject(tagsArray) {
    console.log('filters', tagsArray);
    console.log('thisplaces', this.places);
    this.places = this.places.filter((place) => tagsArray.indexOf(place.especialidad) >= 0);
    this.saveSessionStorage();
  }

  saveSessionStorage() {
    sessionStorage.setItem('places', JSON.stringify(this.places));
  }

  getSessionStorage() {
    /* setData(); */
    console.log('set data');
    saveListLocalStorage()
      .then(() => {
        window.sessionStorage.setItem('places', localStorage.getItem('list'));
        this.places = JSON.parse(sessionStorage.getItem('places'));
        this.places.forEach(printTableRow);
        createSelectOptionsCities();
        createSelectOptionsSubjects();
        createSelectOptionsCenters();
      })
      .then(() => {
        htmlSpinner.classList.add('u-hide');
        htmlLastTableRow.classList.remove('u-hide');
        htmlFiltersBtn.removeAttribute('disabled');
        htmlDownloadBtn.removeAttribute('disabled');
      })
      .catch((error) => {
        console.log(`Handling error as we received ${error}`);
      });
  }
}
