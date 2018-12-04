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



    var animateWidth = function(reqElem, callback){
      var fps = 50; //число кадров в секунду
      var calcWidth = calculateWidth();
      var interval = setInterval(function() {
        // вычислить чему равна ширина на каждом кадре анимации
      var actualWidth = parseFloat(getComputedStyle(reqElem).width);
      if (actualWidth >= calcWidth) {
          clearInterval(interval);
          callback(reqElem);
          return;
        }
        // рисует состояние анимации
      draw(actualWidth+100);

      }, 1000/fps);

      function draw(actWidth) {
        reqElem.style.width = actWidth + 'px';
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
          activeElem.style.width = '0px';
          activeItem.classList.remove('accordeon-menu__item_active');
          activeElem.querySelector('.accordeon-menu__desc-text').style.opacity = 0;
          reqItem.classList.add('accordeon-menu__item_active');

          function callback(reqElem){
            const reqText = reqElem.querySelector('.accordeon-menu__desc-text');
            reqText.style.opacity = 1;
            console.log('reqText.style.opacity');
          }

          animateWidth(reqElem, callback);
          
        };
      }
    })
  }
  return {init: startAccordeon}
};

export {accordeon}
