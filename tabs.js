//adds in the tab logic to the page to swap between multiple tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    //Gets all elements with class = "tabcontent" and hides them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Gets all elements with class ="tablinks" and removes the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //Shows the current tab, and adds an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
