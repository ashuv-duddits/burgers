var name = 'Александр';
console.log(name);
name = 'Сергей';
console.log(name);

if (100 > 50){
    console.log('Я победил');
}
if (100 < 50){
    console.log('Я победил');
} else {
    console.log('Я проиграл');
}

for(var i=1; i<=10; i++){
    console.log(i);
}

function sum(p1,p2,p3){
    var result = p1+p2+p3;
    return result;
}

var result = sum(15,15,5);
console.log(result);