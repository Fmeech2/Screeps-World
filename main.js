require('РУССКИЕметоды');//импортировать нерабочий фаил
/*Роли крипов:
🚜💰🌾🥕🍏🌱🪴🌿🍃💧🎍🍀🌳🏕🏞🐝🍯🐞🌻🪲
🚛🚚
⚡
🔨🏗️🧱
🛠🔧🔩
🔋🔌🔆
👑🆙📜🏛
🚀🔖
🏹🎯🔫
🗡⚔️🥷🪓
🛡🚧🔒
🏰
🧛💉🩹🩺⚕️
🕵🗺🔭📡
🎩📦📊
🤖🧠📡⚙️🎮
🔄♻️💀🏴‍☠️🗑
👾💀🧟‍♂️🦾🌇🌤🌻🌅☀️🌞
⏰⏱️⏲️🕰️⌛⏳
*/


//РУССКИЕ функции

//** @param {string} выбранная_анимация **/
function анимация(выбранная_анимация) {

    const анимации = {
        часики: [
            "🕛",
            "🕐",
            "🕑",
            "🕒",
            "🕓",
            "🕔",
            "🕕",
            "🕖",
            "🕗",
            "🕘",
            "🕙",
            "🕚",
        ], песочные_часы: [
            "⌛",
            "⏳",
        ],
        error: ["❓",
            "🚫",
            "❓",
            "🛑",
        ]
    }
    if (!анимации[выбранная_анимация]) {
        return анимации["error"][Game.time % анимации["error"].length];
    }
    return анимации[выбранная_анимация][Game.time % анимации[выбранная_анимация].length];
}

//Спавн крипа
//В имени крипа не должно быть чёрточке при спавне
function СпавнКрипа(имяСпавна, имяКрипа, рольКрипа, телоКрипа) {
    //СпавнКрипа(имяСпавна, имяКрипа, рольКрипа, телоКрипа)
    if (имяСпавна && имяКрипа && рольКрипа && телоКрипа) {
        var имяКрипа = рольКрипа + имяКрипа + ' №' + Game.time;
        var рольКрипа = рольКрипа;
        var телаКрипа = телоКрипа;
        var уровеньКрипа = телаКрипа.length / 2;
        var номерКрипа = Game.time;
        var стоимостьКрипа = СтоимостьКрипа(телаКрипа);
    }
    //СпавнКрипа(имяСпавна, имяКрипа, рольКрипа)
    else if (имяСпавна && имяКрипа && рольКрипа) {
        var имяКрипа = рольКрипа + имяКрипа + ' №' + Game.time;
        var рольКрипа = рольКрипа;
        var телаКрипа = [WORK, MOVE, CARRY];
        var уровеньКрипа = телаКрипа.length / 2;
        var номерКрипа = Game.time;
        var стоимостьКрипа = СтоимостьКрипа(телаКрипа);
    }
    //СпавнКрипа(имяСпавна, имяКрипа)
    else if (имяСпавна && имяКрипа) {
        var имяКрипа = рольКрипа + имяКрипа + ' №' + Game.time;
        var рольКрипа = 'без роли';
        var телаКрипа = [WORK, MOVE, CARRY];
        var уровеньКрипа = телаКрипа.length / 2;
        var номерКрипа = Game.time;
    }
    //СпавнКрипа()
    else {
        for (var имяСпавна in Game.spawns) {
            var имяКрипа = рольКрипа + Game.time;
            var рольКрипа = 'без роли';
            var телаКрипа = [WORK, MOVE, CARRY];
            var уровеньКрипа = телаКрипа.length / 2;
            var номерКрипа = Game.time;
            break;
        }
    }
    var спавнВозможен = Game.spawns[имяСпавна].spawnCreep(
        телаКрипа,
        имяКрипа,
        {
            memory: {
                роль: рольКрипа,
                уровень: уровеньКрипа,
                номер: номерКрипа
            }
        });
    var всегоЭнергииДляКрипов = ВсегоЭнергииДляКрипов();
    let началСпавнКрипа = ПроверкаСпавнаКрипа(спавнВозможен, имяСпавна, имяКрипа, рольКрипа, уровеньКрипа, стоимостьКрипа, всегоЭнергииДляКрипов);

    if (спавнВозможен === OK) {
        //если спавн возможен то можно выполнить какой нибудь ненужный код... 
        //Но у тебя для этого уже есть метод ПроверкаСпавнаКрипа(), который возращает true или false, взависимости от того запустилась команда спаунера или он занят/не может/не хватает денег
    }
    return началСпавнКрипа;
}


//Отладка спавнеров в консоль на русском
function ПроверкаСпавнаКрипа(спавнВозможен, имяСпавна, имяКрипа, рольКрипа, уровеньКрипа, стоимостьКрипа, всегоЭнергииДляКрипов) {

    if (спавнВозможен == -1) {
        console.log('Спавн не твой |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -2) {
        console.log('Нет пути для крипа, чтобы добраться до спавна |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -3) {
        console.log('Имя крипа уже существует (' + имяКрипа + ') ' + рольКрипа + ' |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -4) {
        console.log('Спавн занят созданием другого крипа |' + имяСпавна + '| (' + рольКрипа + ')');
    }
    else if (спавнВозможен == -6) {
        console.log('⚠ Не хватает ' + (стоимостьКрипа - всегоЭнергииДляКрипов) + ' энергии для спавна |' + имяКрипа + '| ' + рольКрипа + ' ' + уровеньКрипа + ' LVL на спавне |' + имяСпавна + '| стоимость:' + стоимостьКрипа + '');
    }
    else if (спавнВозможен == -10) {
        console.log('Неверные аргументы. Это ошибка возникает, если переданы неправильные параметры, такие как неверный формат или неправильное количество частей для крипа. |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -11) {
        console.log('Спавн устал и не может создать крипа, так как время восстановления не прошло. ЕСЛИ ЧЕСТНО, ТО Я САМ В ШОКЕ!! |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -12) {
        console.log('Спавн достиг максимального количества существующих клонов (крипов) и не может создать нового. И СНОВА Я В ШОКЕ |' + имяСпавна + '|');
    }
    else if (спавнВозможен == -5) {
        console.log('Если спавн пытается создать крипа вне радиуса действия (например, слишком далеко от целевой позиции). |' + имяСпавна + '|');
    }
    else {
        console.log('✅ Начал спавн |' + имяКрипа + '| ' + рольКрипа + ' ' + уровеньКрипа + ' LVL на спавне |' + имяСпавна + '|');
        return true;
    }
    return false;
}
function СтоимостьКрипа(телаКрипа) {
    let стоимость = {
        "move": 50,
        "work": 100,
        "carry": 50,
        "attack": 80,
        "ranged_attack": 150,
        "heal": 250,
        "claim": 600,
        "tough": 10
    };
    let итоговаяСтоимость = 0;
    for (let i = 0; i < телаКрипа.length; i++) {
        let имяОдинокогоТела = телаКрипа[i]; //Берёт тело из массива по номеру и почему-то слова написанные с большой буквы переписывает на нижний регистр MOVE → move
        итоговаяСтоимость += стоимость[имяОдинокогоТела];
    }
    return итоговаяСтоимость;
}
function ВсегоЭнергииДляКрипов() {
    var всегоЭнергииДляКрипов;
    всегоЭнергииДляКрипов = Game.spawns['Spawn1'].store[RESOURCE_ENERGY];

    всеХранилищаExtension = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => (
            structure.structureType === STRUCTURE_EXTENSION
        )
    })
    for (var допХранилищеСпавна in всеХранилищаExtension) {
        всегоЭнергииДляКрипов += всеХранилищаExtension[допХранилищеСпавна].energy;
    }
    return всегоЭнергииДляКрипов;
}

крипыФазы1 = [
    "фермер1",
    "сборщик1",
    "фермер1",
    "планировщик_смертник_1",
    "фермер1",
    "фермер1",
    "фермер1",
    "апдейтер1",
    "апдейтер1",
    "апдейтер1",
    "апдейтер1",
]
телаКриповПоИмени = {
    фермер1: {
        роль: "🚜",
        тело: [WORK, WORK, CARRY, MOVE]
    },
    сборщик1: {
        роль: "♻️",
        тело: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]
    },
    планировщик_смертник_1: {
        роль: "🏴‍",
        тело: [MOVE]
    },
    апдейтер1: {
        роль: "⚡",
        тело: [WORK, MOVE, MOVE, CARRY]
    },


    фермер2: {
        роль: "🚜",
        тело: [WORK, WORK, CARRY, MOVE]
    },
    сборщик2: {
        роль: "♻️",
        тело: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]
    },
    планировщик_смертник_2: {
        роль: "🏴‍",
        тело: [MOVE]
    },
    апдейтер2: {
        роль: "⚡",
        тело: [WORK, MOVE, MOVE, MOVE, CARRY]
    },
    курьер_энергии2_простой: {//курьер_энергии2_простой
        роль: "📦",
        тело: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]
    },
}
module.exports.loop = function () {
    let допИнфаПоФазе="";
    if (!Memory.фаза) {
        Memory.фаза = {}; 
        Memory.фаза.номер = 1;
        Memory.фаза.последовательностьКрипов = 1;
        Memory.фаза.таймерФазы = 0;
    }
    ИнформацияОКомнате = {
        x: Game.spawns['Spawn1'].pos.x,
        y: Game.spawns['Spawn1'].pos.y - 4
    }
    Game.spawns['Spawn1'].room.visual.text(
        '🚜' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🚜').length) + " " +
        '⚡' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '⚡').length) + " " +
        '🏗️' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🏗️').length) + " " +
        '🔋' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🔋').length) + " " +
        '  ♻' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '♻️').length) + " " +
        '🏴‍' + parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🏴‍').length) + " ",
        ИнформацияОКомнате.x,
        ИнформацияОКомнате.y,
        {
            align: 'center',
            opacity: 0.8,
            backgroundColor: '#000000',  // Чёрный фон
            color: '#FFFFFF',  // Белый текст
            font: 0.5  // Размер шрифта
        });
    Game.spawns['Spawn1'].room.visual.text(
        'ФАЗА ' + Memory.фаза.номер,
        ИнформацияОКомнате.x,
        ИнформацияОКомнате.y + 1,
        {
            align: 'center',
            opacity: 0.8,
            backgroundColor: '#000000',  // Чёрный фон
            color: '#FFFFFF',  // Белый текст
            font: 0.5  // Размер шрифта
        });

    
 
    переноснойМетодУдалиПотом();
    if (Memory.фаза.номер == 1) {
        фаза1();
        console.log("УРОВЕНЬ КОНТРОЛЕРА -              " + Game.spawns["Spawn1"].room.controller.level);
        console.log("Таймер Фазы -                     " + Memory.фаза.таймерФазы);
        console.log("Всего заготовленых крипов -       " + крипыФазы1.length);
        console.log("Какой крип должен заспавнитться - " + Memory.фаза.последовательностьКрипов);
        console.log("Какая ФАЗА сейчас в памяти -      " + Memory.фаза.номер);
        допИнфаПоФазе = " 🦾" + Memory.фаза.последовательностьКрипов + "/" + крипыФазы1.length + " " + анимация("песочные_часы") + (600 - Memory.фаза.таймерФазы);
    }
    Game.spawns['Spawn1'].room.visual.text(
        '☀️ ' + ВсегоЭнергииДляКрипов() + " 🤖" + _.filter(Game.creeps, крип => крип.room.name == Game.spawns["Spawn1"].room.name).length + допИнфаПоФазе,
        ИнформацияОКомнате.x,
        ИнформацияОКомнате.y + 2,
        {
            align: 'center',
            opacity: 0.8,
            backgroundColor: '#000000',  // Чёрный фон
            color: '#FFFFFF',  // Белый текст
            font: 0.5  // Размер шрифта
        });
    //УДАЛИТЬ ВСЕХ МЁРТВЫХ КРИПОВ
    for (var имя in Memory.creeps) {
        if (!Game.creeps[имя])
            delete Memory.creeps[имя];
    }


    function фаза1() {
        let имяКрипа = "Спейс марин фазы 1";
        let спавн1 = "Spawn1";
        let уровеньКонтроллераВКомнатеСпавна = Game.spawns[спавн1].room.controller.level;
        if (крипыФазы1.length >= Memory.фаза.последовательностьКрипов) {
            let началСпавнКрипа = СпавнКрипа(
                спавн1
                , имяКрипа
                , телаКриповПоИмени[крипыФазы1[Memory.фаза.последовательностьКрипов - 1]].роль
                , телаКриповПоИмени[крипыФазы1[Memory.фаза.последовательностьКрипов - 1]].тело
            );
            if (началСпавнКрипа) { //двигаемся к спавну следующего крипа, после успешного спавна текущего
                Memory.фаза.последовательностьКрипов = Memory.фаза.последовательностьКрипов + 1;
            }
        }
        else if (Memory.фаза.таймерФазы < 600 || уровеньКонтроллераВКомнатеСпавна == 1) {
            Memory.фаза.таймерФазы = Memory.фаза.таймерФазы + 1;
            //Количество фермеров в популяции
            if (_.filter(Game.creeps, крип => крип.memory.роль == телаКриповПоИмени.фермер1.роль).length < 5) {
                СпавнКрипа(спавн1, имяКрипа, телаКриповПоИмени.фермер1.роль, телаКриповПоИмени.фермер1.тело);
            }
            //Количество апдейтеров в популяции
            else if (_.filter(Game.creeps, крип => крип.memory.роль == телаКриповПоИмени.апдейтер1.роль).length < 6) {
                СпавнКрипа(спавн1, имяКрипа, телаКриповПоИмени.апдейтер1.роль, телаКриповПоИмени.апдейтер1.тело);
            }
            //Количество сборщиков в популяции
            else if (_.filter(Game.creeps, крип => крип.memory.роль == телаКриповПоИмени.сборщик1.роль).length < 1) {
                СпавнКрипа(спавн1, имяКрипа, телаКриповПоИмени.сборщик1.роль, телаКриповПоИмени.сборщик1.тело);
            }
        }
        else {
            Memory.фаза.номер = 2;
            Memory.фаза.последовательностьКрипов = 1;
            Memory.фаза.таймерФазы = 0;
        }
        for (var имя in Game.creeps) {
            var крип = Game.creeps[имя];
            //🚜
            if (крип.memory.роль == телаКриповПоИмени.фермер1.роль) {
                фермер(крип);
            }
            //⚡
            else if (крип.memory.роль == телаКриповПоИмени.апдейтер1.роль) {
                апдейтер(крип);
            }
            //🏗️
            else if (крип.memory.роль == "🏗️") {
                строитель(крип);
                крип.say("🏗️");
            }
            //🔋
            else if (крип.memory.роль == "🔋") {
                зарядник(крип);
                крип.say("🔋");
            }
            //♻️
            else if (крип.memory.роль == телаКриповПоИмени.сборщик1.роль) {
                сборщик1(крип);
            }
        }
    }

    function переноснойМетодУдалиПотом() {
        if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🚜').length) < 5) {
            СпавнКрипа("Spawn1", "Спейс марин", "🚜", [WORK, WORK, MOVE, CARRY]);
        }
        else if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '♻️').length) < 1) {
            СпавнКрипа("Spawn1", "Спейс марин", "♻️", телаКриповПоИмени[крипыФазы1[1]].тело);
        }
        else if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🏴‍').length) < 0) {
            СпавнКрипа("Spawn1", "Спейс марин", "🏴‍", телаКриповПоИмени[крипыФазы1[3]].тело);
        }
        else if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '⚡').length) < 10) {
            СпавнКрипа("Spawn1", "Спейс марин", "⚡", [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]);
        }
        else if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🏗️').length) < 1) {
            СпавнКрипа("Spawn1", "Спейс марин", "🏗️", [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]);
        }
        else if (parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == '🔋').length) < 2) {
            СпавнКрипа("Spawn1", "Спейс марин", "🔋", [WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY]);
        }
        //СпавнКрипа("Император", "Спейс марин2");
        //СпавнКрипа();

        for (var имя in Game.creeps) {
            var крип = Game.creeps[имя];
            if (крип.memory.роль == "🚜") {
                фермер(крип);
            }
            else if (крип.memory.роль == "⚡") {
                апдейтер(крип);
            }
            else if (крип.memory.роль == "🏗️") {
                строитель(крип);
                крип.say("🏗️");
            }
            else if (крип.memory.роль == "🔋") {
                зарядник(крип);
                крип.say("🔋");
            }
            else if (крип.memory.роль == "♻️") {
                сборщик1(крип);
            }
        }
        //УДАЛИТЬ ВСЕХ МЁРТВЫХ КРИПОВ
        for (var имя in Memory.creeps) {
            if (!Game.creeps[имя])
                delete Memory.creeps[имя];
        }
        tower = Game.getObjectById('67dcba6a8a0e990a8d864204');
        var ближайшаяПовреждённаяСтруктура = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.hitsMax - structure.hits) > 200
                && structure.hits < structure.hitsMax
            //&& structure.structureType !== STRUCTURE_WALL 
            //&& structure.structureType !== STRUCTURE_CONTAINER
        });
        ближайшаяПовреждённаяСтруктура = ближайшаяПовреждённаяСтруктура.sort((a, b) => a.hits - b.hits);//чиво?
        if (ближайшаяПовреждённаяСтруктура) {
            tower.repair(ближайшаяПовреждённаяСтруктура[0]);
        }


    };






    /** @param {Creep} крип **/
    function сборщик1(крип) {
        if (!крип.memory.статус) {
            крип.memory.статус = "поиск мусора";
            крип.say("♻️");
        }
        let статусКрипа = крип.memory.статус;
        let ближайшееРасстояниеДоЭнергииНаПолу = 1000;
        let ближайшийНомерЭнергииНаПолу = 0;
        let энергияНаПолу = крип.room.find(FIND_DROPPED_RESOURCES, {
            filter: (resource) => resource.resourceType === RESOURCE_ENERGY // Ищем энергию на полу
        });
        let трупы = крип.room.find(FIND_CREEPS, {
            filter: (creep) => creep.my === false // Ищем чужие трупы
        });
        let всяЛишняяЭнергияСПола = [...энергияНаПолу, ...трупы];
        if (статусКрипа == "поиск мусора" && всяЛишняяЭнергияСПола[0]) {

            for (var выбранныйНомерЭнергииНаПолу in всяЛишняяЭнергияСПола) {

                var расстояниеДоЭнергииНаПолу = крип.pos.getRangeTo(всяЛишняяЭнергияСПола[выбранныйНомерЭнергииНаПолу]);
                if (расстояниеДоЭнергииНаПолу < ближайшееРасстояниеДоЭнергииНаПолу) {
                    ближайшееРасстояниеДоЭнергииНаПолу = расстояниеДоЭнергииНаПолу;
                    ближайшийНомерЭнергииНаПолу = выбранныйНомерЭнергииНаПолу;
                }

            }
            if (ближайшееРасстояниеДоЭнергииНаПолу <= 1) {
                крип.pickup(всяЛишняяЭнергияСПола[ближайшийНомерЭнергииНаПолу]);
                крип.say("💀♻️💀");
            }
            else {
                крип.moveTo(всяЛишняяЭнергияСПола[ближайшийНомерЭнергииНаПолу],
                    {
                        visualizePathStyle: {
                            stroke: 'white',   // Цвет линии (HEX)
                            lineStyle: 'dotted', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                            strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                            opacity: 1         // Прозрачность (от 0 до 1)
                        }
                    });
            }
            крип.say("♻️ " + всяЛишняяЭнергияСПола.length);
        }
        if ((крип.store.getFreeCapacity() == 0 && статусКрипа != "Разгружаю 💰️" || !всяЛишняяЭнергияСПола[0]) && статусКрипа != "ожидаю ⏲️") {
            крип.memory.статус = "Разгружаю 💰️";
            крип.say("💰️ " + всяЛишняяЭнергияСПола.length);
        }
        if (крип.memory.статус == "Разгружаю 💰️") {
            let спавнИДругие = кудаВыгружатьЭнергиюСпавна(крип);
            крип.moveTo(спавнИДругие,
                {
                    visualizePathStyle: {
                        stroke: 'white',   // Цвет линии (HEX)
                        lineStyle: 'dotted', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                        strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                        opacity: 0.6         // Прозрачность (от 0 до 1)
                    }
                });
            крип.transfer(спавнИДругие, RESOURCE_ENERGY);
        }
        if (крип.store[RESOURCE_ENERGY] == 0 && всяЛишняяЭнергияСПола[0]) {
            крип.memory.статус = "поиск мусора";
            крип.say("♻️ " + всяЛишняяЭнергияСПола.length);
        }
        else if (крип.store[RESOURCE_ENERGY] == 0 && !всяЛишняяЭнергияСПола[0]) {
            крип.memory.статус = "ожидаю ⏲️";
            крип.say("♻️ " + анимация("часики"));
        }
    }

    /** @param {Creep} крип **/
    function фермер(крип) {
        var фермер = крип;
        var НномерЗолотойШахты = номерЗолотойШахты(фермер);
        var золотодобытчик1 = фермер.room.find(FIND_SOURCES)[НномерЗолотойШахты];
        var спавн1 = кудаВыгружатьЭнергиюСпавна(крип);
        if (фермер.store[RESOURCE_ENERGY] == 0 && фермер.memory.статус != 'иду ⛏️') {
            фермер.memory.статус = 'иду ⛏️';
        }


        if (фермер.memory.статус == 'иду ⛏️') {
            if (фермер.harvest(золотодобытчик1) != ERR_NOT_IN_RANGE && фермер.store.getFreeCapacity() != 0) {
                фермер.memory.статус = 'Добываю 💎️';
                фермер.memory.источник = НномерЗолотойШахты;
            }
            else {
                фермер.moveTo(золотодобытчик1,
                    {
                        visualizePathStyle: {
                            stroke: '#ffd700'
                        }
                    });
            }
        }
        if (фермер.memory.статус == 'Добываю 💎️') {
            if (фермер.store.getFreeCapacity() == 0) {
                фермер.memory.статус = 'Разгружаю 💰️';
            }
            else {
                //фермер.moveTo(золотодобытчик1,
                //    {
                //        visualizePathStyle: {
                //            stroke: 'black',   // Цвет линии (HEX)
                //            lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                //            strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                //            opacity: 0.5         // Прозрачность (от 0 до 1)
                //        }
                //    });
                if (фермер.room.find(FIND_SOURCES)[фермер.memory.источник].energy != 0) {
                    фермер.moveTo(фермер.room.find(FIND_SOURCES)[фермер.memory.источник],
                        {
                            visualizePathStyle: {
                                stroke: 'black',   // Цвет линии (HEX)
                                lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                                strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                                opacity: 0.5         // Прозрачность (от 0 до 1)
                            }
                        });
                    фермер.harvest(фермер.room.find(FIND_SOURCES)[фермер.memory.источник]);
                }
                else {
                    if (фермер.room.find(FIND_SOURCES)[фермер.memory.источник].ticksToRegeneration < 65) {
                        if (фермер.pos.getRangeTo(фермер.room.find(FIND_SOURCES)[фермер.memory.источник]) < 6) {
                            фермер.moveTo(25, 25, {
                                visualizePathStyle: {
                                    stroke: 'black',   // Цвет линии (HEX)
                                    lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                                    strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                                    opacity: 0.5         // Прозрачность (от 0 до 1)
                                }
                            });
                        }
                    }
                    else {
                        фермер.memory.статус = 'Разгружаю 💰️';
                    }
                }
            }
        }
        if (фермер.memory.статус == 'Разгружаю 💰️') {
            фермер.moveTo(спавн1,
                {
                    visualizePathStyle: {
                        stroke: '#00FFFF',   // Цвет линии (HEX)
                        lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                        strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                        opacity: 0.5         // Прозрачность (от 0 до 1)
                    }
                });
            фермер.transfer(спавн1, RESOURCE_ENERGY);
        }
    }
    /** @param {Creep} крип **/
    function апдейтер(крип) {
        var апдейтер = крип;
        var НномерЗолотойШахты = номерЗолотойШахты(апдейтер);
        var золотодобытчик1 = апдейтер.room.find(FIND_SOURCES)[НномерЗолотойШахты];
        var спавн1 = Game.spawns['Spawn1'];
        if (апдейтер.store[RESOURCE_ENERGY] == 0 && апдейтер.memory.статус != 'иду ⛏️') {
            апдейтер.memory.статус = 'иду ⛏️';
        }


        if (апдейтер.memory.статус == 'иду ⛏️') {
            if (апдейтер.harvest(золотодобытчик1) != ERR_NOT_IN_RANGE && апдейтер.store.getFreeCapacity() != 0) {
                апдейтер.memory.статус = 'Добываю 💎️';
                апдейтер.memory.источник = НномерЗолотойШахты;
            }
            else {
                апдейтер.moveTo(золотодобытчик1,
                    {
                        visualizePathStyle: {
                            stroke: '#ffd700'
                        }
                    });
            }
        }
        if (апдейтер.memory.статус == 'Добываю 💎️') {
            if (апдейтер.store.getFreeCapacity() == 0) {
                апдейтер.memory.статус = 'Разгружаю 💰️';
            }
            else {
                //апдейтер.moveTo(золотодобытчик1,
                //    {
                //        visualizePathStyle: {
                //            stroke: 'black',   // Цвет линии (HEX)
                //            lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                //            strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                //            opacity: 0.5         // Прозрачность (от 0 до 1)
                //        }
                //    });
                if (апдейтер.room.find(FIND_SOURCES)[апдейтер.memory.источник].energy != 0) {
                    апдейтер.harvest(апдейтер.room.find(FIND_SOURCES)[апдейтер.memory.источник]);
                }
                else {
                    апдейтер.memory.статус = 'Разгружаю 💰️';
                }
            }
        }
        if (апдейтер.memory.статус == 'Разгружаю 💰️') {
            if (апдейтер.upgradeController(апдейтер.room.controller) == ERR_NOT_IN_RANGE) {
                апдейтер.moveTo(апдейтер.room.controller,
                    {
                        visualizePathStyle: {
                            stroke: 'red',   // Цвет линии (HEX)
                            lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                            strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                            opacity: 0.5         // Прозрачность (от 0 до 1)
                        }
                    });
            }
        }
    }
    /** @param {Creep} крип **/
    function строитель(крип) {

        var строитель = крип;
        var НномерЗолотойШахты = номерЗолотойШахты(строитель);
        var золотодобытчик1 = строитель.room.find(FIND_SOURCES)[НномерЗолотойШахты];
        var спавн1 = Game.spawns['Spawn1'];
        if (строитель.store[RESOURCE_ENERGY] == 0 && строитель.memory.статус != 'иду ⛏️') {
            строитель.memory.статус = 'иду ⛏️';
        }


        if (строитель.memory.статус == 'иду ⛏️') {
            if (строитель.harvest(золотодобытчик1) != ERR_NOT_IN_RANGE && строитель.store.getFreeCapacity() != 0) {
                строитель.memory.статус = 'Добываю 💎️';
                строитель.memory.источник = НномерЗолотойШахты;
            }
            else {
                строитель.moveTo(золотодобытчик1,
                    {
                        visualizePathStyle: {
                            stroke: '#ffd700'
                        }
                    });
            }
        }
        if (строитель.memory.статус == 'Добываю 💎️') {
            if (строитель.store.getFreeCapacity() == 0) {
                строитель.memory.статус = 'Разгружаю 💰️';
            }
            else {
                //строитель.moveTo(золотодобытчик1,
                //    {
                //        visualizePathStyle: {
                //            stroke: 'black',   // Цвет линии (HEX)
                //            lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                //            strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                //            opacity: 0.5         // Прозрачность (от 0 до 1)
                //        }
                //    });
                if (строитель.room.find(FIND_SOURCES)[строитель.memory.источник].energy != 0) {
                    строитель.harvest(строитель.room.find(FIND_SOURCES)[строитель.memory.источник]);
                }
                else {
                    строитель.memory.статус = 'Разгружаю 💰️';
                }
            }
        }
        if (строитель.memory.статус == 'Разгружаю 💰️') {
            var targets = строитель.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (строитель.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    строитель.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }

    /** @param {Creep} крип **/
    function зарядник(Ккрип) {
        var крип = Ккрип;
        //        run(крип, КакойТыНомерФермера);
        //        КакойТыНомерФермера++;
        //        continue;
        var НномерЗолотойШахты = номерЗолотойШахты(крип);
        var золотодобытчик1 = крип.room.find(FIND_SOURCES)[1];
        var спавн1 = кудаВыгружатьЭнергиюБашни(крип);
        if (крип.store[RESOURCE_ENERGY] == 0 && крип.memory.статус != 'иду ⛏️') {
            крип.memory.статус = 'иду ⛏️';
        }


        if (крип.memory.статус == 'иду ⛏️') {
            if (крип.harvest(золотодобытчик1) != ERR_NOT_IN_RANGE && крип.store.getFreeCapacity() != 0) {
                крип.memory.статус = 'Добываю 💎️';
                крип.memory.источник = НномерЗолотойШахты;
            }
            else {
                крип.moveTo(золотодобытчик1,
                    {
                        visualizePathStyle: {
                            stroke: '#ffd700'
                        }
                    });
            }
        }
        if (крип.memory.статус == 'Добываю 💎️') {
            if (крип.store.getFreeCapacity() == 0) {
                крип.memory.статус = 'Разгружаю 💰️';
            }
            else {
                if (крип.room.find(FIND_SOURCES)[1].energy != 0) {
                    крип.moveTo(крип.room.find(FIND_SOURCES)[1],
                        {
                            visualizePathStyle: {
                                stroke: 'black',   // Цвет линии (HEX)
                                lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                                strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                                opacity: 0.5         // Прозрачность (от 0 до 1)
                            }
                        });
                    крип.harvest(крип.room.find(FIND_SOURCES)[1]);
                }
                else {
                    if (крип.room.find(FIND_SOURCES)[1].ticksToRegeneration < 65) {
                        if (крип.pos.getRangeTo(крип.room.find(FIND_SOURCES)[1]) < 6) {
                            крип.moveTo(25, 25, {
                                visualizePathStyle: {
                                    stroke: 'black',   // Цвет линии (HEX)
                                    lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                                    strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                                    opacity: 0.5         // Прозрачность (от 0 до 1)
                                }
                            });
                        }
                    }
                    else {
                        крип.memory.статус = 'Разгружаю 💰️';
                    }
                }
            }
        }
        if (крип.memory.статус == 'Разгружаю 💰️') {
            крип.moveTo(спавн1,
                {
                    visualizePathStyle: {
                        stroke: '#00FF11',   // Цвет линии (HEX)
                        lineStyle: 'solid', // Тип линии: пунктир"dashed", микропунктир"dotted" или линия"solid"
                        strokeWidth: 0.15,   // Толщина линии (от 0.1 до 5)
                        opacity: 0.5         // Прозрачность (от 0 до 1)
                    }
                });
            крип.transfer(спавн1, RESOURCE_ENERGY);
        }
    }

    function номерЗолотойШахты(крип) {
        var номерЗолотойШахты = 0;
        весДистанцииДоЗолотойШахты1 = (1 / (крип.pos.getRangeTo(крип.room.find(FIND_SOURCES)[0]) + 1)) + (0.35 * крип.room.find(FIND_SOURCES)[0].energy / 3000); //Чем ближе и больше энергии в источнике 1, тем выше вес
        try { весДистанцииДоЗолотойШахты2 = (1 / (крип.pos.getRangeTo(крип.room.find(FIND_SOURCES)[1]) + 1)) + (0.35 * крип.room.find(FIND_SOURCES)[1].energy / 3000); }
        catch (e) { весДистанцииДоЗолотойШахты2 = 0; } //Чем ближе к источнику 2, тем выше вес
        try { весДистанцииДоЗолотойШахты3 = (1 / (крип.pos.getRangeTo(крип.room.find(FIND_SOURCES)[2]) + 1)) + (0.35 * крип.room.find(FIND_SOURCES)[2].energy / 3000); }
        catch (e) { весДистанцииДоЗолотойШахты3 = 0; } //Чем ближе к источнику 3, тем выше вес


        if (весДистанцииДоЗолотойШахты1 < весДистанцииДоЗолотойШахты2)
            номерЗолотойШахты = 1;
        if (весДистанцииДоЗолотойШахты1 < весДистанцииДоЗолотойШахты3 &&
            весДистанцииДоЗолотойШахты2 < весДистанцииДоЗолотойШахты3)
            номерЗолотойШахты = 2;

        крип.say(весДистанцииДоЗолотойШахты1.toFixed(4) + "|" + весДистанцииДоЗолотойШахты2.toFixed(4));
        return номерЗолотойШахты;
    }
    function кудаВыгружатьЭнергиюСпавна(крип) {
        var местоВыгрузкиЭнергии;
        var всеХранилищаExtension;
        var лучшийНомерХранилища = 0;
        var лучшийВесХранилища = 0;
        всеХранилищаExtension = крип.room.find(FIND_STRUCTURES, {
            filter: (structure) => (
                structure.structureType === STRUCTURE_EXTENSION &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0
            )
        })
        for (var допХранилищеСпавна in всеХранилищаExtension) {
            var весХранилища = 1 / (крип.pos.getRangeTo(всеХранилищаExtension[допХранилищеСпавна]) + 1);
            //console.log(допХранилищеСпавна + " - " + всеХранилищаExtension[допХранилищеСпавна].store.getFreeCapacity(RESOURCE_ENERGY));
            if (весХранилища > лучшийВесХранилища) {
                лучшийВесХранилища = весХранилища;
                лучшийНомерХранилища = допХранилищеСпавна;
            }
        }
        if (крип.pos.getRangeTo(всеХранилищаExtension[лучшийНомерХранилища]) < крип.pos.getRangeTo(Game.spawns['Spawn1'])) {
            местоВыгрузкиЭнергии = всеХранилищаExtension[лучшийНомерХранилища];
        }
        else {
            if (Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                местоВыгрузкиЭнергии = всеХранилищаExtension[лучшийНомерХранилища];
            }
            else {
                местоВыгрузкиЭнергии = Game.spawns['Spawn1'];
            }
        }
        //местоВыгрузкиЭнергии = Game.spawns['Spawn1']; 
        return местоВыгрузкиЭнергии;
    }
    function кудаВыгружатьЭнергиюБашни(крип) {
        var местоВыгрузкиЭнергии;
        var всеХранилищаExtension;
        var лучшийНомерХранилища = 0;
        var лучшийВесХранилища = 0;
        всеХранилищаExtension = крип.room.find(FIND_STRUCTURES, {
            filter: (structure) => (
                structure.structureType === STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0
            )
        })
        for (var допХранилищеСпавна in всеХранилищаExtension) {
            var весХранилища = 1 / (крип.pos.getRangeTo(всеХранилищаExtension[допХранилищеСпавна]) + 1);
            //console.log(допХранилищеСпавна + " - " + всеХранилищаExtension[допХранилищеСпавна].store.getFreeCapacity(RESOURCE_ENERGY));
            if (весХранилища > лучшийВесХранилища) {
                лучшийВесХранилища = весХранилища;
                лучшийНомерХранилища = допХранилищеСпавна;
            }
        }
        if (крип.pos.getRangeTo(всеХранилищаExtension[лучшийНомерХранилища]) < крип.pos.getRangeTo(Game.spawns['Spawn1'])) {
            местоВыгрузкиЭнергии = всеХранилищаExtension[лучшийНомерХранилища];
        }
        else {
            местоВыгрузкиЭнергии = всеХранилищаExtension[лучшийНомерХранилища];
        }
        //местоВыгрузкиЭнергии = Game.spawns['Spawn1']; 
        return местоВыгрузкиЭнергии;
    }
}






/*
var roleUpgrader = require('роль.апгрейдер');
var roleBuilder = require('роль.строитель');
var рольНосильщик = require('роль.носильщик');
var рольЗаправщик = require('роль.заправщик');


module.exports.loop = function () {
    if (!Memory.силаЛегионаЗаВсёРемя) {
        Memory.силаЛегионаЗаВсёРемя = 0;  // Инициализируем значение переменной, если оно ещё не установлено
    }
    if (!Memory.времяЛегиона) {
        Memory.времяЛегиона = 0;  // Будем счита каждый тик сами, с нуля
    }
    Memory.времяЛегиона++;
    
    let время = new Date();
    let секунды = время.getSeconds();
    
    var башня1 = Game.getObjectById('67b833445d9a97d59d1f0442');
    if(башня1) {
        var closestDamagedStructure = башня1.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.hitsMax-structure.hits>800 && structure.hitsMax<1000000000
        });
        if(closestDamagedStructure) {
            башня1.repair(closestDamagedStructure);
        }
        
        var closestHostile = башня1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            башня1.attack(closestHostile);
        }
    }
    let энергииНаСкладах = Game.spawns['Император Человечества'].store[RESOURCE_ENERGY]
    +Game.getObjectById('67b774732196877ef30f17b5').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b7682b9e6f9a1f9399300c').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b76ec3c2549843a5fd1d46').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b788b6457b31041238a368').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b78dfc457b313da338a4ba').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b791b2113645636976d941').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b79443a02ffd0c9ad89227').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b79844de199fac1688c1f1').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b79b81dcfc782abb55b9b6').store[RESOURCE_ENERGY]
    +Game.getObjectById('67b79ec62080d92f8b72b3a6').store[RESOURCE_ENERGY];
    let разрешоннойЭнергии = 450;
        if (Memory.времяЛегиона%15==1){
            console.log('Всего солдат: '+(parseInt(_.filter(Game.creeps).length))+'          энергии на складах: '+энергииНаСкладах+'/'+разрешоннойЭнергии);}
if (_.filter(Game.creeps).length<30){
    if (энергииНаСкладах >=разрешоннойЭнергии){
        let рандомнаяРольКрипа = 'фермер';
        if (Object.values(Game.creeps).filter(creep => creep.memory.роль == 'фермер').length>5
        && (Math.random()*2/1)>1)
            рандомнаяРольКрипа = 'строитель';
            
        console.log(' ');
        console.log(' ');
        console.log('Спавню нового Космо-Десантника! Суммарно космодесов: '+(parseInt(_.filter(Game.creeps).length) + 1) + '. В процессе создания');

        
        if(parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == 'фермер').length)<6){
            Game.spawns['Император Человечества'].spawnCreep( 
                [WORK, MOVE, MOVE,MOVE, CARRY, CARRY,CARRY,CARRY ], 
                'Спейс-марин №'+Memory.силаЛегионаЗаВсёРемя+' (🚜фермер)' ,
                { memory: { 
                    роль: 'фермер',
                    уровень: 1,
                    номер: Memory.силаЛегионаЗаВсёРемя
                } } );
                Memory.силаЛегионаЗаВсёРемя++;
        }
        else if(parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == 'заправщик').length)<2){
            Game.spawns['Император Человечества'].spawnCreep( 
                [WORK,WORK, WORK, MOVE,MOVE, CARRY,CARRY,CARRY,CARRY ], 
                'Спейс-марин №'+Memory.силаЛегионаЗаВсёРемя+' (заправщик)' ,
                { memory: { 
                    роль: 'заправщик',
                    уровень: 1,
                    номер: Memory.силаЛегионаЗаВсёРемя
                } } );
                Memory.силаЛегионаЗаВсёРемя++;
        }
        else if(parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == 'носильщик').length)<2){
            Game.spawns['Император Человечества'].spawnCreep( 
                [WORK, MOVE, MOVE, CARRY,CARRY,CARRY,CARRY ], 
                'Спейс-марин №'+Memory.силаЛегионаЗаВсёРемя+' (носильщик)' ,
                { memory: { 
                    роль: 'носильщик',
                    уровень: 1,
                    номер: Memory.силаЛегионаЗаВсёРемя
                } } );
                Memory.силаЛегионаЗаВсёРемя++;
        }
        else if(parseInt(Object.values(Game.creeps).filter(creep => creep.memory.роль == 'апгрейдер').length)<2){
            Game.spawns['Император Человечества'].spawnCreep( 
                [WORK,WORK, MOVE, MOVE, CARRY,CARRY,CARRY,CARRY ], 
                'Спейс-марин №'+Memory.силаЛегионаЗаВсёРемя+' (апгрейдер)' ,
                { memory: { 
                    роль: 'апгрейдер',
                    уровень: 1,
                    номер: Memory.силаЛегионаЗаВсёРемя
                } } );
                Memory.силаЛегионаЗаВсёРемя++;
        }
        else {
            Game.spawns['Император Человечества'].spawnCreep( 
                [WORK,WORK,WORK, MOVE,MOVE, CARRY,CARRY,CARRY, CARRY, CARRY ], 
                'Спейс-марин №'+Memory.силаЛегионаЗаВсёРемя+' ('+'⛏️строитель'+')'  ,     
                { memory: { 
                    роль: 'строитель',
                    уровень: 1,
                    номер: Memory.силаЛегионаЗаВсёРемя
                } } );
                Memory.силаЛегионаЗаВсёРемя++;
        }
        console.log('Спейс-марин(🚜фермер)   : '+Object.values(Game.creeps).filter(creep => creep.memory.роль == 'фермер').length);
        console.log('Спейс-марин(⛏️строитель): '+Object.values(Game.creeps).filter(creep => creep.memory.роль == 'строитель').length);
        console.log('Спейс-марин(⛏️апгрейдер): '+Object.values(Game.creeps).filter(creep => creep.memory.роль == 'апгрейдер').length);
        console.log('Спейс-марин(⛏️носильщик): '+Object.values(Game.creeps).filter(creep => creep.memory.роль == 'носильщик').length);
        console.log('Спейс-марин(⛏️заправщик): '+Object.values(Game.creeps).filter(creep => creep.memory.роль == 'заправщик').length);
    
        

    }
}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.роль == 'фермер') {
            roleHarvester.run(creep);
            
        }
        if(creep.memory.роль == 'апгрейдер') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.роль == 'строитель') {
            roleBuilder.run(creep);
        }
        if(creep.memory.роль == 'носильщик') {
            рольНосильщик.run(creep);
        }
        if(creep.memory.роль == 'заправщик') {
            рольЗаправщик.run(creep);
        }

    }
}















Поменять ролько крипам определённой роли
if(creep.memory.роль == 'РольСейчас') {
    creep.memory.роль = 'РольПослеИзменений';
}




*/