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
          reqElem.style.width = calculateWidth() + 'px';
          reqItem.classList.add('accordeon-menu__item_active');
        };
      }
    })
  }
  return {init: startAccordeon}
};

export {accordeon}
