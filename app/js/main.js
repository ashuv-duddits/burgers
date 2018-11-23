import {menu} from './menu.js';
import {accordeon} from './accordeon.js';
import {slide} from './slider.js';
import {submitForm, reviewOpen} from './ajaxForm.js';

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

/* Функционал One Page Scroll */
var ops = (function(){
  const maincontent = document.querySelector('.maincontent');
  let start = function(){
    maincontent.addEventListener('wheel', function(e){
      const computed = getComputedStyle(this);
      const sectionsAmount = this.children.length;
      var height = parseInt(computed.height)/sectionsAmount;
      let currentTop = parseInt(computed.top);
      if (!currentTop) {
        currentTop = 0;
      }
      if ((currentTop%height==0)||(currentTop==0)){
        if ((e.deltaY > 0)&&(Math.abs(currentTop)<height*(sectionsAmount-1))) {
          this.style.top = currentTop - height + 'px';
        }else if ((e.deltaY < 0)&&(currentTop<0)){
          this.style.top = currentTop + height + 'px';
        }
     }
    })
  }
  return {init: start};
})()

ops.init();