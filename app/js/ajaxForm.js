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
  }

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
  }

  return {
    open: openOverlay,
    close: closeOverlay
  }
})()

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
}

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
}
const form = document.querySelector('#form');
form.addEventListener('submit', submitForm);

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
      overlay.open('#modal', content);
    }
  })
}
reviewOpen();

