/* Функционал горизонтального и вертикального аккордеонов */

var accordeon = function(){
  function startAccordeon(option){
    const accordeonList = document.querySelector(option.accordeonList);

    var calculateWidth = function(){
      let windowWidth = window.innerWidth;
      let links = document.querySelectorAll('.accordeon-menu__link');
      let linksWidth = parseFloat(getComputedStyle(links[0]).width);
      let reqWidth = windowWidth - linksWidth*links.length;
      return reqWidth > 550 ? 550 : reqWidth;
    }



    var animateWidth = function(reqElem, callback, moveTo){
      var fps = 50; //число кадров в секунду
      var calcWidth = calculateWidth();
      var start = Date.now(); // сохранить время начала
      var duration = 300;
      if (moveTo == 1){
        var interval = setInterval(function() {
          // вычислить сколько времени прошло с начала анимации
          var timeFraction = (Date.now() - start)/duration;
          if (timeFraction>=1){timeFraction=1}
          // рисует состояние анимации
          console.log('ВПЕРЕД');
          draw(timeFraction);
          if (timeFraction >= 1) {
              clearInterval(interval);
              callback(reqElem);
              return;
            }

    
          }, 1000/fps);
      } else {
        var intervalZero = setInterval(function() {
          // вычислить сколько времени прошло с начала анимации
          var timeFraction = (Date.now() - start)/duration;
          if (timeFraction>=1){timeFraction=1}
          // рисует состояние анимации
          console.log('НАЗАД');
          draw(1-timeFraction);
          if (timeFraction >= 1) {
              clearInterval(intervalZero);
              return;
            }
    
          }, 1000/fps);
      }


      function draw(timeFraction) {
        reqElem.style.width = timeFraction*calcWidth + 'px';
      }
    }


   //Устанавливаем высоту элемента при первичной загрузке странице
   const accordeonActiveItem = document.querySelector('.accordeon__item_active');
   const accordeonActiveElem = accordeonActiveItem.querySelector('.accordeon__elem');
   accordeonActiveElem.style.height = accordeonActiveElem.scrollHeight + 'px';

   //Устанавливаем ширину элемента при первичной загрузке странице
    const accordeonActiveMenuItem = document.querySelector('.accordeon-menu__item_active');
    const accordeonActiveMenuElem = accordeonActiveMenuItem.querySelector('.accordeon-menu__desc');
    accordeonActiveMenuElem.style.width = calculateWidth() + 'px';
    const accordeonActiveMenuElemText = accordeonActiveMenuElem.querySelector('.accordeon-menu__desc-text');
    accordeonActiveMenuElemText.style.opacity = 1;


    accordeonList.addEventListener('click', function(e){
      e.preventDefault();
      var reqItem = e.target.closest(option.accordeonItem),
          reqElem = reqItem!=null?reqItem.querySelector(option.accordeonElem):null,
          activeItem = document.querySelector(option.accordeonItem+option.accordeonItemActive),
          activeElem = activeItem.querySelector(option.accordeonElem);
      if (reqElem!=null){
        if ((!reqItem.classList.contains('accordeon__item_active'))&&(reqItem.classList.contains('accordeon__item'))){
          activeElem.style.height = '0px';
          activeItem.classList.remove('accordeon__item_active');
          reqElem.style.height = reqElem.scrollHeight + 'px';
          reqItem.classList.add('accordeon__item_active');
        };
        if ((!reqItem.classList.contains('accordeon-menu__item_active'))&&(reqItem.classList.contains('accordeon-menu__item'))){
          
          activeItem.classList.remove('accordeon-menu__item_active');
          const activeText = activeElem.querySelector('.accordeon-menu__desc-text');
          activeText.style.opacity = 0;
          
          animateWidth(activeElem, null, 0);

          reqItem.classList.add('accordeon-menu__item_active');
          function callback(reqElem){
            const reqText = reqElem.querySelector('.accordeon-menu__desc-text');
            reqText.style.opacity = 1;
          }
          animateWidth(reqElem, callback, 1);
          
        };
      }
    })
  }
  return {init: startAccordeon}
};

export {accordeon}
