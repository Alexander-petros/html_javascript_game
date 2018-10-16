function update_to_new(){
    let legacy_ui = document.getElementById("legacy");
    let death_overlay = document.getElementById("death_overlay");
    fadeout(legacy_ui);
    fadein(death_overlay);
}

function loadscript(n_script){
    let scriptElement = document.createElement('script');
    scriptElement.src = n_script;
    document.head.appendChild(scriptElement);
}

function fadeout(fade_target){
    let fade_out = setInterval(function(){
        if (!fade_target.style.opacity) {
            fade_target.style.opacity = 1;
        }
        if (fade_target.style.opacity > 0) {
            fade_target.style.opacity -= 0.1;
        }
        else {
            clearInterval(fade_out);
            loadscript("battle.js");
            fade_target.style.display = "none";
        }
    }, 200);
}

function fadein(fade_target){
    let op = 0.01;
    fade_target.style.opacity = op;
    fade_target.style.display = "inline";
    let timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
            loadscript("death.js");
        }
        fade_target.style.opacity = op;
        fade_target.style.filter = 'alpha(opacity=' + op * 10 + ")";
        op += op * 0.05;
    }, 20);

}
