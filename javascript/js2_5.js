const a = document.createElement('a');
a.setAttribute('href', 'https://loftschool.com')
const container = document.querySelector('#container');
container.appendChild(a);
var _HREF = a.getAttribute('href');
a.addEventListener('click', function(event){
    event.preventDefault();
    console.log('Я кликнул на ссылку ' + _HREF);
});

