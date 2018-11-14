const hamburgerLink = document.querySelector('.hamburger-menu-link');
const hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerLink.addEventListener('click', function(e){
  e.preventDefault();
  var display = getComputedStyle(hamburgerMenu).display;
  if (display == 'none'){
    hamburgerMenu.style.display = 'flex';
  } else {
    hamburgerMenu.style.display = 'none';
  }
});