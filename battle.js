var cLog = document.getElementById('combatLog');
var atk = document.getElementById('atk');
var def = document.getElementById('def');
var skl = document.getElementById('skl');
var uskl = document.getElementById('uskl');
var pHp = document.getElementById('playerHpText');
var player = {
    strength:   10, //used for damage calc
    defense:    10,
    magic:      10, //used for certain skills
    hp:         20,
    mhp:        20, //maximum hp values
    skl:        0, //skill index number
    attack:     function() {
        return this.strength * 2;
    },
    hurt:       function(damage) {
        //calculation gives you 5% more hp per point of defense
        let dmg = Math.ceil(damage * (1 - (0.05 * this.defense / ( 1 + 0.05 * this.defense))));
        //at least one damage per attack
        if (dmg == 0) dmg = 1;
        console.log(dmg);
        if (dmg >= this.hp) {
            this.hp = 0;
            pHp.innerHTML = "Dead";
        }
        else{
            this.hp = this.hp - dmg;
            pHp.innerHTML = this.hp;
        }
    },
    //removes minimum damage and halves damage taken
    defend:     function(damage) {
        let dmg = Math.floor(damage * (1 - (0.05 * this.defense / ( 1 + 0.05 * this.defense))));
        dmg = Math.floor(dmg/2);
        console.log(dmg);
        if (dmg >= this.hp) {
            pHp.innerHTML = "Dead";
        }
        else{
            this.hp = this.hp - dmg;
            pHp.innerHTML = this.hp;
        } 
    },
    skill:      function() {
        skillDb[this.skl]();
        this.skl++;
    }
};
//imports external skill database 
var skilldatabase = document.createElement('script');
skilldatabase.src = 'skilldb.js';
document.head.appendChild(skilldatabase);

var enemydatabase = document.createElement('script');
enemydatabase.src = 'enemydb.js';
document.head.appendChild(enemydatabase);

atk.onclick = function(){
    console.log("Attack");
    addCombatLog("Attacked");
    goblin1.hurt(player.attack());
    player.hurt(10);
};

def.onclick = function(){
    console.log("Defend");
    addCombatLog("Defended");
    player.defend(10);
};

skl.onclick = function(){
    console.log("Skill");
    addCombatLog("Spec");
    player.skill();
};

uskl.onclick = function(){
    console.log("Ultimate skill");
    addCombatLog("Ultimate Skill");
};

function addCombatLog(text){
    let textnode = document.createTextNode(text);
    cLog.appendChild(textnode);
    let br = document.createElement("br");
    cLog.appendChild(br);
}
