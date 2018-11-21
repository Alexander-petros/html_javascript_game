function Enemy(name, str, def, mag, mhp, skl) {
    this.name = name;
    this.str = str;
    this.def = def;
    this.mag = mag;
    this.hp = mhp;
    this.mhp = mhp;
    this.skl = skl;
    this.hurt = function() { console.log('hurt');}
}

eHit = function(){
    console.log("enemy hit");
};

let eSkill = [eHit]

var goblin1 = new Enemy('Goblin', 2, 3, 1, 5, 0);
var goblin2 = new Enemy('Goblin', 2, 3, 1, 10, 0);
let eIndex = [goblin1, goblin2];
