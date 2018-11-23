const slide = (function(option){
  const left = document.querySelector(option.l);
  const right = document.querySelector(option.r);
  const slider = document.querySelector(option.list);
  const container = document.querySelector(option.c);
  const computed = getComputedStyle(slider);
  const containerWidth = parseInt(getComputedStyle(container).width);
  var sliderItemsAmount = slider.children.length;
  
  let addListeners = function(){
    right.addEventListener("click", function(e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);
    
      if (!currentRight) {
        currentRight = 0;
      }
      
      if (currentRight < (sliderItemsAmount-1)*containerWidth) {
        slider.style.right = currentRight + containerWidth + "px";
      }
    });
    
    left.addEventListener("click", function(e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);
    
      if (!currentRight) {
        currentRight = 0;
      }
    
      if (currentRight > 0) {
        slider.style.right = currentRight - containerWidth + "px";
      }
    });
  }
  return {init: addListeners}
})({
  l: ".slider__scroll-left",
  r: ".slider__scroll-right",
  list: ".slider__list",
  c: ".container"
})

export {slide}





