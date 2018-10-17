//Used to start the text when the overlay fades in
setInterval(function() {
    advance_text();
}, 2000);

//text advances while displaying on screen
var text_position = 0;
function advance_text() {
    if (text_position == 0) {
        fadein_text("Oh...", false);
        text_position++;
    }
    else if (text_position == 1) {
        fadein_text("You seem to have met a terrible fate", true);
        text_position++;
    }
    else if (text_position == 2) {
        fadein_text("Im willing to allow you to change your actions for a mere...", false);
        text_position++;
    }
    else if (text_position == 3) {
        fadein_text ("  10,000,000 gold", true);
        text_position++;
    }
    else if (text_position == 4) {
        fadein_text ("A bargain really", true);
        text_position++;
    }
    else if(text_position == 5) {
        fadein_text ("However, it does not seem that your " + protag.gold + " gold", false);
        text_position++;
    }
    else if (text_position == 6) {
        fadein_text (" will be able to cover it", true);
        text_position++;
    }
}

//fades in text with the context of "word" then if it adds a newline at the end of the line if true
function fadein_text(word, newline) {
    let node = document.createElement('p');
    node.setAttribute("class", "death_text");
    let textnode = document.createTextNode(word);
    node.appendChild(textnode);
    death_overlay.appendChild(node);
    if (newline == true) {
        death_overlay.appendChild(document.createElement('br'));
    }
    let op = 0.05;
    let timer = setInterval(function() {
       if (op >= 1) {
           clearInterval(timer);
       }
       node.style.opacity = op;
       op += op * 0.15; //fades in multiplicatively and faster than the other overlay
    }, 100);
}
