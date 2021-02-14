import * as L from 'leaflet';
import { printTableRows } from './js/filters';

const theData = JSON.parse(window.localStorage.getItem('list'));

const saveListInLocalStorage = (data) => {
  window.localStorage.setItem('list', JSON.stringify(data));
  // const list = JSON.parse(window.localStorage.getItem('items'));
};

const getData = () => {
  fetch('https://rocio-m-sebastian.github.io/list/data.json', { method: 'GET' }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
    .then((data) => {
      saveListInLocalStorage(data.list);
      printTableRows(theData);
      // applyFilter(theData);
    })
    .catch((error) => {
      console.log(error);
      console.log('error');
    });
};

// Get data on page load
getData();
printTableRows(theData);

const mapWrapper = (data) => {
  // leaflet images
  L.Icon.Default.imagePath = '.';
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/assets/img/marker-icon-2x.png',
    iconUrl: '/assets/img/marker-icon.png',
    shadowUrl: '/assets/img/marker-shadow.png',
  });

  // leaflet Map
  const mymap = L.map('js-leaflet-map').setView([40.498455, -3.567630], 5);
  const tileUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
  const tileAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
  const tiles = L.tileLayer(tileUrl, { attribution: tileAttribution });
  tiles.addTo(mymap);

  data.forEach((element) => {
    const marker = L.marker([element.centro.coordenadas.x, element.centro.coordenadas.y]).bindPopup(`
      <p>${element.centro.nombre}</p>
      <b>${element.especialidad}</b>
    `);
    marker.addTo(mymap);
  });
};

const btnMapview = document.getElementById('js-btn-mapview');
const mapview = document.getElementById('js-mapview');
const btnTableview = document.getElementById('js-btn-tableview');
const tableview = document.getElementById('js-tableview');

btnMapview.addEventListener('click', () => {
  console.log('mapview');
  mapview.classList.remove('u-hide');
  mapview.classList.add('u-show');
  tableview.classList.remove('u-show');
  tableview.classList.add('u-hide');
  mapWrapper(theData);
});

btnTableview.addEventListener('click', () => {
  console.log('tableview');
  tableview.classList.remove('u-hide');
  tableview.classList.add('u-show');
  mapview.classList.remove('u-show');
  mapview.classList.add('u-hide');
});
