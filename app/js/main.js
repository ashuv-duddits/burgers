/* Функционал полноэкранного меню */

var menu = (function(option){
  const hamburgerMenuLink = document.querySelector(option.button);
  const hamburgerMenu = document.querySelector(option.overlay);
  const hamburgerMenuList = document.querySelector(option.list).children;
  const body = document.body;
  var isActiveMenu = false;
  var counter = 0;

  function startMenuAnimation(){
    if (counter%2 == 0) {
      let elemEven = hamburgerMenuList[counter];
      elemEven.classList.toggle('lightSpeedIn');
    }else{
      let elemOdd = hamburgerMenuList[counter];
      elemOdd.classList.toggle('lightSpeedInLeft');
    }
    counter++;
    if (counter<hamburgerMenuList.length){
      setTimeout(startMenuAnimation, 100);
    }
    if (counter===hamburgerMenuList.length){
      counter=0;
    }
  }

  function menuToggle(e) {
    e.preventDefault();
    hamburgerMenuLink.classList.toggle(option.buttonClassToggle);
    hamburgerMenu.classList.toggle(option.overlayClassToggle)
    body.classList.toggle(option.bodyBlockScroll);
    startMenuAnimation();
    isActiveMenu ? isActiveMenu = false : isActiveMenu = true;
  }

  function openMenu(){
    hamburgerMenuLink.addEventListener('click', menuToggle);
    hamburgerMenu.addEventListener('click', function(e){
      if (e.target.className === option.overlayLink){
        menuToggle(e);
      }
    });
    document.addEventListener('keydown', function(e){
      if ((e.keyCode==27)&&(isActiveMenu)){
        menuToggle(e);
      }
    })
  }
  return {open: openMenu};
})({
  button: '.hamburger-menu-link',
  overlay: '.hamburger-menu',
  list: '.hamburger-menu__list',
  overlayLink: 'hamburger-menu__link',
  buttonClassToggle: 'hamburger-menu-link-active',
  overlayClassToggle: 'hamburger-menu-active',
  bodyBlockScroll: 'block-scroll'
});

/* Акивировать функционал полноэкранного меню */
menu.open();

/* Функционал горизонтального и вертикального аккордеонов */

var accordeon = function(){
  function startAccordeon(option){
    const accordeonList = document.querySelector(option.accordeonList);
    accordeonList.addEventListener('click', function(e){
      e.preventDefault();
      var item = e.target.parentNode.parentNode;
      var itemA = e.target.parentNode;
      for (i of accordeonList.children){   
        if ((i.classList.contains(option.accordeonItemActive))&&((item.classList.contains(option.accordeonItem))||(itemA.classList.contains(option.accordeonItem)))){
          i.classList.remove(option.accordeonItemActive);
        }
        if ((item === i)||(itemA === i)){
          i.classList.add(option.accordeonItemActive);
        }
      }
    })
  }
  return {init: startAccordeon}
};

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

/* Функционал слайдера */

const slide = (function(option){
  const left = document.querySelector(option.l);
  const right = document.querySelector(option.r);
  const slider = document.querySelector(option.list);
  const computed = getComputedStyle(slider);
  const sliderWidth = parseInt(getComputedStyle(slider).width);
  var sliderItemsAmount = slider.children.length;
  
  let addListeners = function(){
    right.addEventListener("click", function(e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);
    
      if (!currentRight) {
        currentRight = 0;
      }
      
      if (currentRight < (sliderItemsAmount-1)*sliderWidth) {
        slider.style.right = currentRight + sliderWidth + "px";
      }
    });
    
    left.addEventListener("click", function(e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);
    
      if (!currentRight) {
        currentRight = 0;
      }
    
      if (currentRight > 0) {
        slider.style.right = currentRight - sliderWidth + "px";
      }
    });
  }
  return {init: addListeners}
})({
  l: ".slider__scroll-left",
  r: ".slider__scroll-right",
  list: ".slider__list"
});

/* Акивировать функционал слайдера */

slide.init();

/* Функционал обработки ответа от сервера и модального окна */

var overlay = (function(){

  /* Закрыть модальное окно */

  let closeOverlay = function(modalId, content){
    let overlay = document.querySelector(modalId);
    let innerOverlay = document.querySelector(`.${modalId.substr(1)}__inner`);
    let link = document.querySelector(`.${modalId.substr(1)}__close`);
    overlay.classList.remove('modal_active');
    document.body.classList.remove('block-scroll');
    content.remove();
    link.remove();
    innerOverlay.remove();
  };

  /* Открыть модальное окно */

  let openOverlay = function(modalId, content){
    let overlay = document.querySelector(modalId);
    let innerOverlay = document.createElement('div');
    innerOverlay.classList.add(`${modalId.substr(1)}__inner`)
    overlay.appendChild(innerOverlay);
    innerOverlay.appendChild(content);
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.classList.add(`${modalId.substr(1)}__close`);
    innerOverlay.appendChild(link);

    overlay.addEventListener('click', function(e){
      e.preventDefault();
      if ((e.target === e.currentTarget)||(e.target.className === link.className)){
        closeOverlay(modalId, content);
      }
    })

    overlay.classList.add('modal_active');
    document.body.classList.add('block-scroll');
  };

  return {
    open: openOverlay,
    close: closeOverlay
  };
})();

/* Функция отправки данных на сервер */

let ajax = function(form){

  let formData = new FormData();
  formData.append("name", form.elements.name.value);
  formData.append("phone", form.elements.phone.value);
  formData.append("comment", form.elements.comment.value);
  formData.append("to", "me@me.com");

  /*let data = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    comment: form.elements.comment.value,
    to: form.elements.to.value
  }*/

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.responseType = 'json';
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formData);
  return xhr;
};

/* Функция обработки ответа от сервера */

var submitForm = function(e){
  e.preventDefault();
  var form = e.target;
  let request = ajax(form);
  request.addEventListener('load', function(){
    let content = document.createElement('div');
    content.classList.add('modal-black');
    content.innerHTML = request.response.message;
    overlay.open('#modalForm', content);
  })
};


/* Открыть модальное окно отзыва */

let reviewOpen = function(){
  let button = document.querySelector('.button_review');
  let container = document.querySelector('.reviews__list');
  container.addEventListener('click', function(e){
    e.preventDefault();
    let target = e.target;
    if(target.className === button.className){
      let desc = target.previousElementSibling;
      let titleHTML = desc.previousElementSibling.outerHTML;
      let descHTML = desc.outerHTML;
      let content = document.createElement('div');
      content.classList.add('modal-black');
      content.innerHTML = titleHTML + descHTML;
      let descIsActive = content.querySelector('.reviews__desc');
      descIsActive.style.display = 'block';
      overlay.open('#modal', content);
    }
  })
};

/* Акивировать функционал обработки ответа от сервера и модального окна */
const form = document.querySelector('#form');
form.addEventListener('submit', submitForm);

/* Акивировать функционал модального окна отзыва */
reviewOpen();