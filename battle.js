var cLog = document.getElementById('combatLog');
var atk = document.getElementById('atk');
var def = document.getElementById('def');
var skl = document.getElementById('skl');
var uskl = document.getElementById('uskl');
var pHp = document.getElementById('playerHpText');
var player = {
    strength:   10,
    defense:    10,
    magic:      10,
    hp:         20,
    mhp:        20
};

atk.onclick = function(){
    console.log("Attack");
    addCombatLog("Attacked");
    modifyPlayerHp(10);
};

def.onclick = function(){
    console.log("Defend");
    addCombatLog("Defended");
};

skl.onclick = function(){
    console.log("Skill");
    addCombatLog("Spec");
};

uskl.onclick = function(){
    console.log("Ultimate skill");
    addCombatLog("Ultimate Skill");
};

function modifyPlayerHp(damage){
    if (damage >= player.hp){
        pHp.innerHTML = "Dead";
        player.hp = 0;
    }
    else{
        console.log(player.hp);
        player.hp = player.hp - damage;
        pHp.innerHTML = player.hp;
    }
}

function addCombatLog(text){
    let textnode = document.createTextNode(text);
    cLog.appendChild(textnode);
    let br = document.createElement("br");
    cLog.appendChild(br);
}
