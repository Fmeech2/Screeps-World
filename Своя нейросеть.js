const MOVE = 1;
const ATTACK = 2;
const RANGED_ATTACK = 3;
const HEAL = 4;
const TOUGH = 5;

function ������(����, ���) {
    let ����� = 0;
    //����������� ������� ������ �� ���
    for (let i = 0; i < ����.length; i++) {
        ����� = ����� + ����[i] * ���[i];
    }
    //������������� ������� (��������)
    return 1 / (1 + Math.exp(-�����));
}

function ��������(����, ���, ���������_���������, ��������_��������) {
    let ����� = ������(����, ���);
    let ������ = ���������_��������� - �����;

    //������������ ����
    for (let i = 0; i < ���.length ;i++) {
        ���[i] = ���[i] + ��������_�������� * ������ * ����[i];//����������� ����� (������ �� �������� �� ����[i] � ��� � �� �����)
    }
}

//��������� ���, �� �������� ������
let ���� = [
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
//let ��� = [Math.random(), Math.random(), Math.random(),Math.random(), Math.random()];
let ��� = [0.1, 0.1, 0.1, 0.1, 0.1];
let ���������_��������� = [
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
]; //����� ������� ������� ��� ����
let ��������_�������� = 0.1;

console.log("�� ��������:", ���);
for (let i = 0; i < 1000; i++) {
    for (j = 0; j < ����.length ; j++) {
        ��������(����[j], ���, ���������_���������[j], ��������_��������);
    }
}
console.log("����� ��������:", ���);
console.log(������(����[0], ���)+ " = 1?");