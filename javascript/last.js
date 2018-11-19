const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");
const item = document.querySelector(".item");
const slider = document.querySelector(".slider");
var itemWidth = getComputedStyle(item).width;
var itemsAmount = items.children.length;
var sumItemWidth = parseInt(itemWidth) * itemsAmount;
var sliderWidth = parseInt(getComputedStyle(slider).width);

right.addEventListener("click", function() {
    var style = getComputedStyle(items).left;

    if ((sumItemWidth - sliderWidth) > Math.abs(parseInt(style))) {
        items.style.left = (parseInt(style) - 100) + 'px';
    }
    // напишите здесь код, который сдвигает items на 100px вправо
    // если items уже сдвинут на 5 элементов впарво, то больше элементы сдвигать не надо, т.к. вы достигли конца списка
});

left.addEventListener("click", function() {
    var style = getComputedStyle(items).left;

    if (parseInt(style) < 0) {
        items.style.left = (parseInt(style) + 100) + 'px';
    }
    // напишите здесь код, который сдвигает items на 100px влево
    // если item находится в самом начале, то больше элементы сдвигать влево не надо, т.к. вы достигли начала списка
});
