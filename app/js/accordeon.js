/* Функционал горизонтального и вертикального аккордеонов */

var accordeon = function(){
  function startAccordeon(option){
    const accordeonList = document.querySelector(option.accordeonList);
    accordeonList.addEventListener('click', function(e){
      e.preventDefault();
      var reqItem = e.target.closest(option.accordeonItem),
          reqElem = reqItem!=null?reqItem.querySelector('.accordeon__elem'):null,
          activeItem = document.querySelector(option.accordeonItem+option.accordeonItemActive),
          activeElem = activeItem.querySelector('.accordeon__elem');
      if (reqElem!=null){
        if (!reqItem.classList.contains('accordeon__item_active')){
          activeElem.style.height = '0px';
          activeItem.classList.remove('accordeon__item_active');
          reqElem.style.height = reqElem.scrollHeight + 'px';
          reqItem.classList.add('accordeon__item_active');
        }
      }
    })
  }
  return {init: startAccordeon}
};

export {accordeon}
