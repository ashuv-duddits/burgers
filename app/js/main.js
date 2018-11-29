import {menu} from './menu.js';
import {accordeon} from './accordeon.js';
import {slide} from './slider.js';
import {submitForm, reviewOpen} from './ajaxForm.js';
import {ops} from './ops.js';

/* Акивировать функционал полноэкранного меню */
menu.open();

/* Акивировать функционал горизонтального и вертикального аккордеонов */
accordeon().init({
  accordeonList: '.accordeon',
  accordeonItem: '.accordeon__item',
  accordeonItemActive: '.accordeon__item_active',
  accordeonElem: '.accordeon__elem'
});
accordeon().init({
  accordeonList: '.accordeon-menu',
  accordeonItem: '.accordeon-menu__item',
  accordeonItemActive: '.accordeon-menu__item_active',
  accordeonElem: '.accordeon-menu__desc'
});

/* Акивировать функционал слайдера */

slide.init();

/* Акивировать функционал обработки ответа от сервера и модального окна */
const form = document.querySelector('#form');
form.addEventListener('submit', submitForm);

/* Акивировать функционал модального окна отзыва */
reviewOpen();

/* Акивировать функционал One Page Scroll */
ops.init();


/* Api Yandex maps */
const divMap = document.querySelector('.maps');
const sectionMap = document.querySelector('.map');
const footer = document.querySelector('.footer');
const heightSectionMap = parseInt(getComputedStyle(sectionMap).height);
const heightFooter = parseInt(getComputedStyle(footer).height);
divMap.style.height = heightSectionMap - heightFooter + 'px';
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

var placemarks = [{
  latitude: 55.30446519,
  longitude: 42.07860061,
  hintContent: '<div class="map__hint">с. Борковка ул. Лесная 45</div>',
  balloonContent: [
    '<div class="map__balloon">',
    'Заходи, таких бургеров ты еще не пробовал! Наш адрес: с. Борковка ул. Лесная 45',
    '</div>'
  ]
},
{
  latitude: 55.30120257, 
  longitude: 42.08559706,
  hintContent: '<div class="map__hint">с. Борковка ул. Садовая 6</div>',
  balloonContent: [
    '<div class="map__balloon">',
    'Заходи, таких бургеров ты еще не пробовал! Наш адрес: с. Борковка ул. Садовая 6',
    '</div>'
  ]
},
{
  latitude: 55.30341454,
  longitude: 42.08792944,
  hintContent: '<div class="map__hint">с. Борковка ул. Новая слобода 9</div>',
  balloonContent: [
    '<div class="map__balloon">',
    'Заходи, таких бургеров ты еще не пробовал! Наш адрес: с. Борковка ул. Новая слобода 9',
    '</div>'
  ]
}];

var geoObjects = [];

function init(){ 
  // Создание карты.    
  var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.32, 42.16],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
  });

  placemarks.forEach(function(obj, index){
    geoObjects[index]= new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent.join('')
    },
    {
      iconLayout: 'default#image',
      iconImageHref: './img/svgs/map-marker.svg',
      iconImageSize: [46, 58],
      iconImageOffset: [-23, -58]
    });
    
  })

  var clusterer = new ymaps.Clusterer({
    clusterIcons:[
      {
        href: './img/svgs/logo.svg',
        size: [100, 100],
        offset: [-50,-50]
      }
    ],
    clusterIconContentLayout: null
  });

  myMap.geoObjects.add(clusterer);
  //myMap.geoObjects.add(placemark);
  clusterer.add(geoObjects);

}


