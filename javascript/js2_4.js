const newElem = document.createElement('div');
const container = document.querySelector('#container');
container.appendChild(newElem);
newElem.textContent = 'Этот элемент создан при помощи DOM API';
newElem.addEventListener('click', function(){
    console.log('Этот текст говорит о том, что я всё сделал правильно');
});
