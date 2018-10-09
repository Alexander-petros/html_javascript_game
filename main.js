var atk = document.getElementById("attack");
var hp1 = document.getElementById("hp1");
var hp2 = document.getElementById("hp2");
var protag = {

    name: "Hero", m_hp: 100, hp: 100, atk: 20, def: 99
}

class Enemy {
    constructor (name, hp, atk, def){
        this.name = name;
        this.m_hp = hp;
        this.hp = hp;
        this.atk = atk;
        this.def = def
    }
}

function dmg_calc(attack, is_protag){
    if (is_protag){
        let p_dmg_curve = Math.ceil(attack /10);//protaganist gets +- 10% damage per attack
        let p_dmg = attack - p_dmg_curve + 1;   //rounded up
        return Math.floor(Math.random() * p_dmg_curve * 2) + p_dmg;
    }
    else{
        let e_dmg_curve = Math.floor(attack /20); //enemy gets +- 5% damage per attack
        let e_dmg = attack - e_dmg_curve;         //rounded down
        return Math.floor(Math.random() * e_dmg_curve * 2) + e_dmg;
    }
}

function def_bonus(defense, attack){
    let atk = Math.floor(attack * (1-(defense/100)));
    if (atk == 0){
        return 1; //a minimum of one damage will always be applied
    }
    else{
        return atk;
    }
}

function hp_check(){
    if (en1.hp <= 0){
        hp1.innerHTML = "Enemy slain";
        return false;
    }
    else if (protag.hp <= 0) {
        hp2.innerHTML = "You have died";
        return false;
    }
    else {
        hp1.innerHTML = "Enemy hp = " + en1.hp;
        hp2.innerHTML = "Your hp = " + protag.hp;
        return true;
    }
}

atk.onclick = function() {
    let p_true_dmg = dmg_calc(protag.atk, true);
    let e_true_dmg = dmg_calc(en1.atk, false);
    p_true_dmg = def_bonus(en1.def, p_true_dmg);
    e_true_dmg = def_bonus(protag.def, p_true_dmg);
    protag.hp = protag.hp - e_true_dmg;
    console.log(protag.hp);
    en1.hp = en1.hp - p_true_dmg;
    hp_check();
}
const en1 = new Enemy("Enemy", 20, 5, 5);
hp1.innerHTML = "Enemy hp = " + en1.hp;
hp2.innerHTML = "Your hp = " + protag.hp;
