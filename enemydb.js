function Enemy(name, str, def, mag, mhp, skl) {
    this.name = name;
    this.str = str;
    this.def = def;
    this.mag = mag;
    this.hp = mhp;
    this.mhp = mhp;
    this.skl = skl;
}

eHit = function(){
    console.log("enemy hit");
};

let eSkill = [eHit]

goblin1 = new Enemy(Goblin, 2, 3, 1, 5, 0);

let eIndex = [goblin1, goblin2];
