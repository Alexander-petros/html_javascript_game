//starts fadeout on the old ui and fades the death overlay in
function update_to_new(){
    let legacy_ui = document.getElementById("legacy");
    let death_overlay = document.getElementById("death_overlay");
    fadeout_oldui(legacy_ui);
    fadein(death_overlay);
}

function loadscript(n_script){
    let scriptElement = document.createElement('script');
    scriptElement.src = n_script;
    document.head.appendChild(scriptElement);
}

function fadeout_oldui(fade_target){
    let fade_out = setInterval(function(){
        if (!fade_target.style.opacity) {
            fade_target.style.opacity = 1;
        }
        if (fade_target.style.opacity > 0) {
            fade_target.style.opacity -= 0.1;
        }
        else {
            clearInterval(fade_out);
            loadscript("battle.js"); //loads the new ui while the death screen plays
            fade_target.style.display = "none";
            fade_target.parentNode.removeChild(fade_target); //deletes old ui from the html
        }
    }, 200);
}


//Fades the death overlay in while running the script
function fadein(fade_target){
    let op = 0.01;  //defines the opacity of the object
    fade_target.style.opacity = op;
    fade_target.style.display = "inline";
    let timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
            loadscript("death.js");
        }
        fade_target.style.opacity = op;
        fade_target.style.filter = 'alpha(opacity=' + op * 10 + ")";
        op += op * 0.05; //multiplicative looks better than an additive fadein
    }, 20);

}
