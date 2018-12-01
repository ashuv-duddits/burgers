/* Функционал One Page Scroll */
var ops = (function(){
  const maincontent = document.querySelector('.maincontent');
  const pointsList = document.querySelector('.points__list');
  const headBtns = document.querySelector('.head__buttons');

/* jQuery plagin for detected mobile device */
var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()){
  /* Для смартфона */
  var touchStart = 0;
  maincontent.addEventListener('touchstart', function(e){
    touchStart = parseInt(e.changedTouches[0].clientY);
    console.log(e);
  })
  maincontent.addEventListener('touchmove', function(e){
    e.preventDefault();
  })
  maincontent.addEventListener('touchend', function(e){
    var activeSlide = this.querySelector('.section-active'),
    activeIndex = Array.from(this.children).indexOf(activeSlide),
    nextItem = activeSlide!=null?activeSlide.nextElementSibling:null,
    prevItem = activeSlide!=null?activeSlide.previousElementSibling:null,
    reqIndex, existedItem, edgeIndex;

      if(Math.abs(parseInt(e.changedTouches[0].clientY) - touchStart)>50){
        if(parseInt(e.changedTouches[0].clientY) < touchStart){
          existedItem = nextItem;
          edgeIndex=activeIndex+1;
        }else{
          existedItem = prevItem;
          edgeIndex=activeIndex-1;
        }
      }
    reqIndex = existedItem!=null ? edgeIndex : activeIndex;

    moveSlide(reqIndex, activeIndex);
  })
}


/* Функция разукрашивания точек */
  var coloringDots = function(index){
    const dotList = document.querySelector('.points__list');
    for(let i of dotList.children){
      if (i.classList.contains('points__item-active')){
        i.classList.remove('points__item-active');
      };
    };
    dotList.children[index].classList.add('points__item-active');
  };

/* Функция движения  */
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

  /* Генерируем точки */

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


/* Для компьютера */
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
/* По нажатию на точку */
    pointsList.addEventListener('click', function(e){
      e.preventDefault();
      var $this = e.target.closest('.points__item'),
          activeSlide = this.querySelector('.points__item-active'),
          activeIndex = Array.from(this.children).indexOf(activeSlide),
          reqIndex = Array.from(this.children).indexOf($this)!=-1?Array.from(this.children).indexOf($this):activeIndex;
      moveSlide(reqIndex, activeIndex);

    })
/* Нажатие на кнопки меню */
    headBtns.addEventListener('click', function(e){
      e.preventDefault();
      var items = maincontent.querySelectorAll('.section'),
            activeSlide = maincontent.querySelector('.section-active'),
            activeIndex = Array.from(maincontent.children).indexOf(activeSlide);
      
      for(let i of items){
        const sectionAttr = i.getAttribute('id');
        const menuLinkAttr = e.target.getAttribute('href');
        if (`#${sectionAttr}` == menuLinkAttr) {
          let reqIndex = Array.from(items).indexOf(i);
          moveSlide(reqIndex, activeIndex);
        }
      }
  
    })

  /* Нажатие на стрелки клавиатуры */
  document.addEventListener('keydown', function(e){
    var activeSlide = maincontent.querySelector('.section-active'),
    activeIndex = Array.from(maincontent.children).indexOf(activeSlide),
    nextItem = activeSlide!=null?activeSlide.nextElementSibling:null,
    prevItem = activeSlide!=null?activeSlide.previousElementSibling:null,
    reqIndex, existedItem, edgeIndex;
    console.log(e.keyCode);
    if (e.keyCode == 40) { //down
      existedItem = nextItem;
      edgeIndex=activeIndex+1;
    }
    if (e.keyCode == 38) { //up
      existedItem = prevItem;
      edgeIndex=activeIndex-1;
    }

    reqIndex = existedItem!=null ? edgeIndex : activeIndex;

    moveSlide(reqIndex, activeIndex);

  })
  /* Нажатие на стрелку вниз в шапке сайта */
  var headDown = document.querySelector('.head__down');
  headDown.addEventListener('click', function(){
    moveSlide(1, 0);
  })
  }
  return {init: start};
})()

export {ops}