function filter(input, than){
    var result=[];
    if (input.length == 0){
        //console.log('Вы передали пустой массив!');
        throw new Error('Вы передали пустой массив!');
    }else{
        for(var i=0; i<input.length; i++){
            if (!isFinite(input[i])){
                //console.log('Елемент массива не число!');
                throw new Error('Елемент массива не число!');
            }else if (input[i]<0) {
                //console.log('Элемент массива должен быть положительным числом');
                throw new Error('Элемент массива должен быть положительным числом');
            }else if (input[i]>than) {
                result.push(input[i]);
            }
        }
    }
    return result;
}

var array = [12, 100, 34, 65, 10];
//var array =[];
try {
    var result = filter(array, 60);
    console.log(result); // [100, 65];
    result = filter(array, 20);
    console.log(result); // [100, 34, 65];
}catch (e){
    console.log(e.message);
}



