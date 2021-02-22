import { getData } from '../http-service';
import { Place } from './place.class';
import { printTableRow } from '../print-table';
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
    console.log('thisplaces', this.places);
    console.log(tagsList);
    const tagsVals = [];
    tagsList.tags.forEach((tag) => {
      tagsVals.push(tag.val);
    });
    console.log('filters', tagsVals);
    if (tagsVals.length === 1) {
      console.log('=');
      this.places = this.places.filter(
        (place) => tagsVals.indexOf(place.localidad) >= 0
        || tagsVals.indexOf(place.especialidad) >= 0
        || tagsVals.indexOf(place.centro.nombre) >= 0,
      );
    } else if (tagsVals.length > 1) {
      console.log('>1');
      if (tagsList.tags.some((e) => e.type === 'place')
         && tagsList.tags.some((e) => e.type === 'subject')
         && tagsList.tags.some((e) => e.type === 'center')) {
        console.log('three types');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'place') && tagsList.tags.some((e) => e.type === 'subject')) {
        console.log('two types 1');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.especialidad) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'subject') && tagsList.tags.some((e) => e.type === 'center')) {
        console.log('two types 2');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.especialidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
        );
      } else if (tagsList.tags.some((e) => e.type === 'center') && tagsList.tags.some((e) => e.type === 'place')) {
        console.log('two types 3');
        this.places = this.places.filter(
          (place) => tagsVals.indexOf(place.localidad) >= 0
          && tagsVals.indexOf(place.centro.nombre) >= 0,
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
    this.places = [];
    const setData = async() => {
      (await getData()).forEach((item) => {
        const row = new Place(item);
        this.places.push(row);
        this.saveSessionStorage();
      });
      this.places.forEach(printTableRow);
    };
    if (sessionStorage.getItem('places')) {
      console.log('data');
      this.places = JSON.parse(sessionStorage.getItem('places'));
      this.places.forEach(printTableRow);
    } else {
      setData();
    }

    // this.places = this.places.map(Place.fromJson);
  }
}
