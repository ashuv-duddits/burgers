import {menu} from './menu.js';
import {accordeon} from './accordeon.js';
import {slide} from './slider.js';
import {submitForm, reviewOpen} from './ajaxForm.js';
import {ops} from './ops.js';
import {ymap} from './ymap.js';
import {player} from './player.js';

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
ymap.start();


/* Активация плеера */
player.init();