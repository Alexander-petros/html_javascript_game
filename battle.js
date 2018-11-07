var cLog = document.getElementById('combatLog');
var atk = document.getElementById('atk');
var def = document.getElementById('def');
var skl = document.getElementById('skl');
var uskl = document.getElementById('uskl');
var player = {
    attack:     10,
    defense:    10,
    magic:      10
};

atk.onclick = function(){
    console.log("Attack");
    addCombatLog("Attacked");
};

def.onclick = function(){
    console.log("Defend");
    addCombatLog("Defended");
};

skl.onclick = function(){
    console.log("Skill");
    addCombatLog("Spec");
};

uskil.onclick = function(){
    console.log("Ultimate skill");
    addCombatLog("Ultimate Skill");
};

function addCombatLog(text){
    let textnode = document.createTextNode(text);
    cLog.appendChild(textnode);
    let br = document.createElement("br");
    cLog.appendChild(br);
}
