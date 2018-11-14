var myString = 'apples are good for your health';
var myArray = myString.split('a');
console.log(myArray);
var str = myArray.join(', ');
console.log(str);
var strNew = myArray.join('a');
console.log(strNew);