const input = document.createElement('input');
input.setAttribute('type', 'text');
const button = document.createElement('button');
button.textContent = 'Нажми меня';
const container = document.querySelector('#container');
container.appendChild(input);
container.appendChild(button);
button.addEventListener('click', function(){
    console.log(input.value);
});
