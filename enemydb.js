function Enemy(name, str, def, mag, mhp, skl) {
    this.name = name;
    this.str = str;
    this.def = def;
    this.mag = mag;
    this.hp = mhp;
    this.mhp = mhp;
    this.skl = skl;
    this.hurt = function(pAttack) {
        //def calculation
        let dmg = Math.ceil(pAttack * (1 - (0.05 * this.def / (1 + 0.06 * this.def))));
        this.hp = this.hp - dmg;
        console.log("Enemy Damage = " + dmg);
        if (this.hp < 0 ){
            this.hp = 0;
            console.log("dead");
            eHp.innerHTML = "dead";
            eKilled();
        }
        else {eHp.innerHTML = this.hp;}
    }
    this.attack = function() { return this.str * 2;}
}

eHit = function(){
    console.log("enemy hit");
};
eKilled = function(){
    console.log(eIndex[enemyNum].name + " has been killed");
    enemyNum++;
}
let eSkill = [eHit]
//                      'Name',str,def,mag,mhp,skillindex
var goblin1 = new Enemy('Goblin_1', 2, 3, 1, 100, 0);
var goblin2 = new Enemy('Goblin_2', 2, 9, 1, 1000, 0);
let eIndex = [goblin1, goblin2];
