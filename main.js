var atk = document.getElementById("attack");
var hp1 = document.getElementById("hp1");
var hp2 = document.getElementById("hp2");
var enemy_killed = false;
var protag_killed = false;
var protag = {
    name: "Hero", m_hp: 100, hp: 100, 
    atk: 20, def: 20,
    mag: 20, gold: 100,
    exp: 0, lvl: 1
};

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

function protag_reward(){
    protag.gold += en1.hp * protag.lvl;
    protag.xp += en1.hp + en1.atk;
}

function en_death(){
    atk.innerHTML = "Battle Finished";
    enemy_killed = true;
    protag_reward();
}

function protag_death(){
    atk.innerhtml = "Continue?";
    protag.gold = Math.floor(protag.gold / 2);
}

function hp_check(){
    if (en1.hp <= 0){
        hp1.innerHTML = "Enemy slain";
        en_death();
        return false;
    }
    else if (protag.hp <= 0) {
        hp2.innerHTML = "You have died";
        protag_death();
        return false;
    }
    else {
        hp1.innerHTML = "Enemy hp = " + en1.hp;
        hp2.innerHTML = "Your hp = " + protag.hp;
        return true;
    }
}

function gen_new_enemy(){
    en1.m_hp = en1.m_hp + 10;
    en1.hp = en1.m_hp;
    en1.atk = en1.atk + 2;
    en1.def = en1.def + 1;
    enemy_killed = false;
}

function protag_heal(){
    protag.hp = protag.m_hp;
}

function reset_display(){
    hp1.innerHTML = "Enemy hp = " + en1.hp;
    hp2.innerHTML = "Your hp = " + protag.hp;
    atk.innerHTML = "Attack";
}

atk.onclick = function() {
    if (enemy_killed == true){
        gen_new_enemy();
        reset_display();
    }
    else if(protag_killed == true){
        protag_heal();
    }
    else {
        let p_true_dmg = dmg_calc(protag.atk, true);
        let e_true_dmg = dmg_calc(en1.atk, false);
        p_true_dmg = def_bonus(en1.def, p_true_dmg);
        e_true_dmg = def_bonus(protag.def, p_true_dmg);
        en1.hp = en1.hp - p_true_dmg;
        if(hp_check()){
            protag.hp = protag.hp - e_true_dmg;
            hp_check();
        }
    }
}
const en1 = new Enemy("Enemy", 20, 5, 5);
hp1.innerHTML = "Enemy hp = " + en1.hp;
hp2.innerHTML = "Your hp = " + protag.hp;
