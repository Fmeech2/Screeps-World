const MOVE = 1;
const ATTACK = 2;
const RANGED_ATTACK = 3;
const HEAL = 4;
const TOUGH = 5;

function нейрон(вход, вес) {
    let сумма = 0;
    //Перемножаем входные данные на вес
    for (let i = 0; i < вход.length; i++) {
        сумма = сумма + вход[i] * вес[i];
    }
    //Активационная функция (сигмойда)
    return 1 / (1 + Math.exp(-сумма));
}

function обучение(вход, вес, ожидаемый_результат, скорость_обучения) {
    let выход = нейрон(вход, вес);
    let ошибка = ожидаемый_результат - выход;

    //Корректируем веса
    for (let i = 0; i < вес.length ;i++) {
        вес[i] = вес[i] + скорость_обучения * ошибка * вход[i];//Гражиентный спуск (почему мы умнажаем на вход[i] я так и не понял)
    }
}

//Тестируем код, на тестовых данных
let вход = [
    [MOVE, MOVE, ATTACK,  ATTACK],
    [ATTACK, ATTACK, MOVE, MOVE],
    [TOUGH, MOVE, MOVE, ATTACK],
    [TOUGH, TOUGH, MOVE, MOVE],
    [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK],
    [TOUGH, MOVE, MOVE, RANGED_ATTACK],
    [ATTACK, ATTACK, ATTACK, MOVE],
    [MOVE, ATTACK, ATTACK, ATTACK ],

    [ATTACK, ATTACK, ATTACK, ATTACK],
    [MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH],
    [HEAL, HEAL, HEAL, HEAL],
    [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
];
//let вес = [Math.random(), Math.random(), Math.random(),Math.random(), Math.random()];
let вес = [0.1, 0.1, 0.1, 0.1, 0.1];
let ожидаемый_результат = [
    7/9,
    7/9,
    4/9,
    0.01,
    (7/2)/9,
    (4 / 2)/9,
    6/9,
    9/9,

    0.1,
    0.1,
    0.05,
    0.05,
    0.2,
]; //Самый сильный ближний бой крип
let скорость_обучения = 0.1;

console.log("До обучения:", вес);
for (let i = 0; i < 1000; i++) {
    for (j = 0; j < вход.length ; j++) {
        обучение(вход[j], вес, ожидаемый_результат[j], скорость_обучения);
    }
}
console.log("После обучения:", вес);
console.log(нейрон(вход[0], вес)+ " = 1?");