// ��������� ����� ����
const �����_���� = ["MOVE", "ATTACK", "RANGED_ATTACK", "HEAL", "TOUGH", "�����"];

//������ �������
function ����������������(���������, ���������) {
    //��������� ���������� ������������ ��-�� �������� �����
    let �������������� = ���������.filter(��������� => ��������� != "MOVE").length * 2 - ���������.filter(��������� => ��������� === "MOVE").length * 2;
    if (�������������� <= 0) �������������� = 1;
    else �������������� = �������������� / 2 + 1;
    let �������������� = 1; // ������������, ��� ���� ������ ���������
    //����� ����� � �������� ����� ������ �� ����� �� �����, � ����������� �� ���������� ������ ����
    let ������� = 50 * 100;
    let ������� = 50 * 100;
    // ��������� ��� (� �������� ���� ��� ������� �� ������ Screeps)
    // ���������� �������: 1 � ������, 0 � ���������
    let ���������� =
        (���������.filter(��������� => ��������� === "ATTACK").length * 30 +
            ���������.filter(��������� => ��������� === "RANGED_ATTACK").length * 15)
        / ��������������
        * (5000 / �������);
    //�������� ����� �� ����������� ���������� �����, ������ ��� �������������� ��� ���� ����� ������� �� ���� ���������� ��������� �����, ��� 50 ������ �����
    let ���������������� =
        (���������.filter(��������� => ��������� === "ATTACK").length * 30 +
            ���������.filter(��������� => ��������� === "RANGED_ATTACK").length * 30)
        / ��������������
        * (5000 / �������);

    //����� ������� ��� ���� ������ ������ ���, ����� �� ����� ���� �� ������������ �� ����� ������, � ���� ������ ��������� ��������� ���������� � ������� � 2 ����
    return ���������� / ����������������;//���������� �� ��������� 1, � % �� ������� ��� ���� ����� �� ������ � ���������� ����� ����� �������
}

//���� ���� �������� ����
class ��������������������������� {
    ���� = [];

    constructor() {
        //��������� ��� ������� ���������� ������ ��� ������ ����� ���� | ����������� 
        for (let i = 0; i < 50; i++) {
            this.����[i] = [];//��������� ������, ������ ��� ��� ����� JS
            for (let j = 0; j < �����_����.length; j++) {
                //������ � ������� ����� ��� ����, ����� ��� �������� ����� ���� ��� | ��� = �� -1 �� 1
                this.����[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    //������� ��������. �� � �� � ������ "�������� ������ ������ ���������� ������ ���� ��� ����� �� ������ ������ ��������� ��" ..������� ��������, �� ������ ��?
    �������() {
        const ����� = [];
        const ��������������������� = [];
        for (let i = 0; i < 50; i++) {
            let �������������������� = 0;
            //�������� �����/������ ����� ���� � ������������ ���������
            for (let j = 0; j < �����_����.length; j++) {
                if (this.����[i][��������������������] < this.����[i][j])
                    �������������������� = j;
            }
            ���������������������[i] = ��������������������;
        }
        //����������� ������ ������� � ������ ��������������� ������ ����
        for (let i = 0; i < 50; i++) {
            �����[i] = �����_����[���������������������[i]];
        }
        return �����;
    }

    //������� ����� ������� ����� (������������ � �������� �����������)
    ��������������() {
        const ���� = new ���������������������������();
        ����.���� = this.����.map(��� => [...���]);//������ ������������ �������, ������ ������������� ������
        return ����;
    }

    //������� �����
    �������(����������� = 0.1, ������������������ = 0.1) {
        for (let i = 0; i < 50; i++) {
            for (j = 0; j < �����_����.length; j++) {
                if (Math.random() < ������������������)
                    this.����[i][j] = this.����[i][j] + (Math.random() * 2 - 1) * �����������;
            }
        }
    }
}

//����� ��� ��������
class ������� {
    ��������� = []; //� ��������� �������� ��������� �������� ������ ���������������������������()
    ���������; //�� ��������
    constructor(���������������, ���������) {
        //�������� ��������� �� ��������� �����
        for (let i = 0; i < ���������������; i++) {
            this.���������[i] = new ���������������������������();
        }
        this.��������� = ���������;
    }

    //������ ���� ������ � ���������
    ����������������������() {
        const ���������� = [];
        for (let i = 0; i < this.���������.length; i++) {
            const ��������� = this.���������[i];
            const ��������� = ���������.�������();
            const ������� = ����������������(���������, this.���������);
            ����������.push({ ���������: ���������, �������: ������� });//������� ������ = [������ �������� �����, ������ �������]
        }
        return ����������;
    }

    //����� ������ ����� � ���������
    �����(���������������� = 1) {
        const ���������� = this.����������������������();
        ����������.sort((���������������������, �����������������������) => �����������������������.������� - ���������������������.�������);//���������� �������  �� ��������
        //��������� ������ ������ ���������� ������
        ���������������� = [];
        for (let i = 0; i < ����������������; i++)
            ����������������.push(����������[i].���������);
        return ����������������;
    }
}