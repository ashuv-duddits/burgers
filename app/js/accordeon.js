/* Функционал горизонтального и вертикального аккордеонов */

var accordeon = function(){
  function startAccordeon(option){
    const accordeonList = document.querySelector(option.accordeonList);
    accordeonList.addEventListener('click', function(e){
      e.preventDefault();
      var item = e.target.parentNode.parentNode;
      var itemA = e.target.parentNode;
      for (let i of accordeonList.children){   
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

export {accordeon}
