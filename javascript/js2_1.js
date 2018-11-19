const newElem = document.createElement('div');
const container = document.querySelector('#container');
container.appendChild(newElem);
newElem.textContent = 'Этот элемент создан при помощи DOM API';
const inner = document.createElement('div');
inner.classList.add('inner');
inner.textContent = 'Этот элемент тоже создан при помощи DOM API';
newElem.appendChild(inner);
inner.style.color = 'red';


