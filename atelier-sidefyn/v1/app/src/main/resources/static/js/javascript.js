function openSubmenu() {
    var w = getWidth();
    if(w > 1200){
        $(".submenu").addClass("open");
    }
}

function closeSubmenu() {
    var w = getWidth();
    if(w > 1200){
        $(".submenu").removeClass("open");
    }
}

function closeSubmenuSlow(){
    var timer;
    timer = setTimeout(closeSubmenu, 500);
}

function openSubmenuSidebar() {
    $(".submenu").addClass("open");
}

function closeSubmenuSidebar() {
    $(".submenu").removeClass("open");
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function showAndHideBurgerMenu() {

    var openMenu = document.getElementById("open-close");
    if (openMenu.innerHTML === "open") {
        openMenu.innerHTML = "close";
        document.getElementById('sidebar').classList.add('active');
        openSubmenuSidebar();
    }
    else {
        openMenu.innerHTML = "open";
        document.getElementById('sidebar').classList.remove('active');
        closeSubmenuSidebar();
    }
}

function closeMenu(){

    closeSubmenu();

    var w = getWidth();
    if(w > 1200){
        var openMenu = document.getElementById("open-close");
        if (openMenu.innerHTML === "close") {
            openMenu.innerHTML = "open";
            document.getElementById('sidebar').classList.remove('active');
        }
    }
}