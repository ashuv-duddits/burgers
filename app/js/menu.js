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


export {menu}



