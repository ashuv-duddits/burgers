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
  const points = document.querySelector('.points__list');

  var coloringDots = function(index){
    const dotList = document.querySelector('.points__list');
    for(let i of dotList.children){
      if (i.classList.contains('points__item-active')){
        i.classList.remove('points__item-active');
      };
    };
    dotList.children[index].classList.add('points__item-active');
  };

  var moveSlide = function(reqIndex, activeIndex){
    const computed = getComputedStyle(maincontent);
    const sectionsAmount = maincontent.children.length;
    var height = parseInt(computed.height)/sectionsAmount;
    let currentTop = parseInt(computed.top);

    if ((currentTop%height==0)||(currentTop==0)){
      maincontent.style.top = -reqIndex*height + 'px';
      maincontent.children[activeIndex].classList.remove('section-active');
      maincontent.children[reqIndex].classList.add('section-active');
      coloringDots(reqIndex);
    }
  }

  let start = function(){

    var generateDots = function(){
      const items = document.querySelectorAll('.section');
      const dotList = document.querySelector('.points__list');
      var activeSlide = maincontent.querySelector('.section-active');
      var index = Array.from(items).indexOf(activeSlide);

      for(let i of items){
        var idSection = i.getAttribute('id');
        var dot = document.createElement('li');
        var dotLink = document.createElement('a');
        dot.classList.add('points__item');
        dotLink.setAttribute('href', `#${idSection}`);
        dotLink.classList.add('points__link');
        dot.appendChild(dotLink);
        dotList.appendChild(dot);
      };
      dotList.children[index].classList.add('points__item-active');
    };
    generateDots();



    maincontent.addEventListener('wheel', function(e){
      var activeSlide = this.querySelector('.section-active'),
          activeIndex = Array.from(this.children).indexOf(activeSlide),
          nextItem = activeSlide!=null?activeSlide.nextElementSibling:null,
          prevItem = activeSlide!=null?activeSlide.previousElementSibling:null,
          reqIndex, existedItem, edgeIndex;

          if(e.deltaY > 0){
            existedItem = nextItem;
            edgeIndex=activeIndex+1;
          }
          if (e.deltaY < 0){
            existedItem = prevItem;
            edgeIndex=activeIndex-1;
          }

          reqIndex = existedItem!=null ? edgeIndex : activeIndex;

      moveSlide(reqIndex, activeIndex);
    });

    points.addEventListener('click', function(e){
      e.preventDefault();
      var $this = e.target.closest('.points__item'),
          activeSlide = this.querySelector('.points__item-active'),
          activeIndex = Array.from(this.children).indexOf(activeSlide),
          reqIndex = Array.from(this.children).indexOf($this);

      moveSlide(reqIndex, activeIndex);

    })
  }
  return {init: start};
})()

ops.init();