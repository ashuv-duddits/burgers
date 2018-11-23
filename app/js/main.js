
import { menu }  from './menu';
import { accordeon } from "./accordeon";
import { slide } from "./slider";
import { submitForm, reviewOpen } from "./ajaxForm";

/* Акивировать функционал полноэкранного меню */
menu.open();

/* Акивировать функционал горизонтального и вертикального аккордеонов */
accordeon().init({
  accordeonList: '.accordeon',
  accordeonItem: 'accordeon__item',
  accordeonItemActive: 'accordeon__item_active'
});
accordeon().init({
  accordeonList: '.accordeon-menu',
  accordeonItem: 'accordeon-menu__item',
  accordeonItemActive: 'accordeon-menu__item_active'
});

/* Акивировать функционал слайдера */

slide.init();

/* Акивировать функционал обработки ответа от сервера и модального окна */
const form = document.querySelector('#form');
form.addEventListener('submit', submitForm);

/* Акивировать функционал модального окна отзыва */
reviewOpen();