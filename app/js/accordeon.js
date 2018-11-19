var accordeon = (function(option){
  const accordeonList = document.querySelector(option.accordeonList);
  
  function startAccordeon(){
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
})({
accordeonList: '.accordeon',
accordeonItem: 'accordeon__item',
accordeonItemActive: 'accordeon__item_active'
})

accordeon.init();

var accordeon2 = (function(option){
  const accordeonList = document.querySelector(option.accordeonList);
  
  function startAccordeon(){
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
})({
accordeonList: '.accordeon-menu',
accordeonItem: 'accordeon-menu__item',
accordeonItemActive: 'accordeon-menu__item_active'
})

accordeon2.init();