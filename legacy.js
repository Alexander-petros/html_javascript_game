var atk = document.getElementById("attack");
var hp1 = document.getElementById("hp1");
var hp2 = document.getElementById("hp2");
var p_skill_status_01 = document.getElementById("player_stats_01");
var p_skill_status_02 = document.getElementById("player_stats_02");
var atk_lvl_button = document.getElementById("atk_lvl");
var def_lvl_button = document.getElementById("def_lvl");
var enemy_killed = false;
var protag_killed = false;
var health_text = "Your hp = ";
var protag = {
    name: "Hero", m_hp: 20, hp: 20,
    atk: 20, def: 20,
    mag: 20, gold: 100,
    exp: 0, lvl: 1,
    sp: 0
};

function gainlevel(){
    def_lvl_button.style.display = "inline";
    atk_lvl_button.style.display = "inline";
    protag_heal();
    protag.exp = (protag.exp - (protag.lvl * 100));
    protag.lvl += 1;
    protag.sp += 5;
}

function checksp(){
    if (protag.sp == 0){
        def_lvl_button.style.display = "none";
        atk_lvl_button.style.display = "none";
    }
}

def_lvl_button.onclick = function(){
    protag.def += 1;
    protag.sp -= 1;
    checksp();
    statsupdate();
}

atk_lvl_button.onclick = function (){
    protag.atk += 1;
    protag.sp -= 1;
    checksp();
    statsupdate();
}

class Enemy {
    constructor (name, hp, atk, def){
        this.name = name;
        this.m_hp = hp;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
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
    let atk = Math.floor(attack * (1-(defense/100))); //every point of defense reduces damage by one percent
    if (atk == 0){
        return 1; //a minimum of one damage will always be applied
    }
    else{
        return atk;
    }
}

function protag_level_check() {
    if (protag.exp >= (protag.lvl * 100)){
        gainlevel();
    }
}

function protag_reward(){
    protag.gold += (en1.m_hp * protag.lvl); //gains more gold per level
    protag.exp += (en1.m_hp + en1.atk); //gains xp based on enemy strength
    protag_level_check();
}

function en_death(){
    atk.innerHTML = "Battle Finished";
    enemy_killed = true;
    protag_reward();
    statsupdate();

}

function protag_death(){
    atk.innerhtml = "Continue?";
    protag_killed = true;
    update_to_new();
}

function hp_check(){
    if (en1.hp <= 0){
        en_death();
        hp1.innerHTML = "Enemy slain";
        return false;
    }
    else if (protag.hp <= 0) {
        hp2.innerHTML = "You have died";
        protag_death();
        return false;
    }
    else {
        hp1.innerHTML = "Enemy hp = " + en1.hp;
        hp2.innerHTML = health_text + protag.hp;
        return true;
    }
}

//does rudimentary scaling of a new enemy
function gen_new_enemy(){
    en1.m_hp = en1.m_hp + 5;
    en1.hp = en1.m_hp;
    en1.atk += 2;
    en1.def += 1;
    enemy_killed = false;
}

function protag_heal(){
    protag.hp = protag.m_hp;
}

function statsupdate(){
    let stat_info = "Atk = " + protag.atk + " ";
    stat_info += "Def = " + protag.def + " ";
    p_skill_status_01.innerHTML = stat_info;
    stat_info = "Gold = " + protag.gold + " ";
    stat_info += "Exp = " + protag.exp + " ";
    p_skill_status_02.innerHTML = stat_info;
    hp2.innerHTML = health_text + protag.hp;
}

function reset_display(){
    hp1.innerHTML = "Enemy hp = " + en1.hp;
    hp2.innerHTML = health_text + protag.hp;
    atk.innerHTML = "Attack";
    statsupdate();
}

atk.onclick = function() {
    if (enemy_killed == true){
        gen_new_enemy();
        reset_display();
    }
    else if(protag_killed == true){
        //protag_heal();
        //protag_killed = false;
        //reset_display();
    }
    else {
        let p_true_dmg = dmg_calc(protag.atk, true);
        let e_true_dmg = dmg_calc(en1.atk, false);
        p_true_dmg = def_bonus(en1.def, p_true_dmg);
        e_true_dmg = def_bonus(protag.def, p_true_dmg);
        en1.hp = en1.hp - p_true_dmg;
        if(hp_check()){
            protag.hp = protag.hp - e_true_dmg; //if the enemy is killed then the player does not get hit
            hp_check();
        }
    }
}
const en1 = new Enemy("Enemy", 20, 5, 5);
hp1.innerHTML = "Enemy hp = " + en1.hp;
hp2.innerHTML = health_text + protag.hp;
statsupdate();
