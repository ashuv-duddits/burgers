function hello(human){
    var name = human.name;
    var lastName = human.lastName;
    var age = human.age;
    var result = 'Привет меня зовут ' + name + ' ' + lastName + ' и мне ' + age + ' лет!';
    return result;
}
var obj = {
    name: 'Александр',
    lastName: 'Шувалов',
    age: 31
}
var result = hello(obj);
console.log(result);