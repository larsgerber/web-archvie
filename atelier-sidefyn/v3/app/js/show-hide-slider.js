function showAndHideBurgerMenu() {
    document.getElementById('sidebar').classList.toggle('active');

    var stopScroll = document.getElementById("page");

    if (stopScroll.style.overflowY === "hidden") {
        stopScroll.style.overflowY = "scroll";
    } else {
        stopScroll.style.overflowY = "hidden";
    }

    var stopMove = document.getElementById("page");
    if (stopMove.style.position === "fixed") {
        stopMove.style.position = "static";
    } else {
        stopMove.style.position = "fixed";
    }

    var openMenu = document.getElementById("open-close");
    if (openMenu.innerHTML === "open") {
        openMenu.innerHTML = "close";
    } else {
        openMenu.innerHTML = "open";
    }
}

function showAndHideSubMenu() {

    var openSubmenu = document.getElementById("submenu-container");
    if (openSubmenu.style.display === "block") {
        openSubmenu.style.display = "none";
    } else {
        openSubmenu.style.display = "block";
    }

    var btnArrows = document.getElementById("unfold-fold");
    if (btnArrows.innerHTML === "\u25BC") {
        btnArrows.innerHTML = "\u25B2";
    } else {
        btnArrows.innerHTML = "\u25BC";
    }
}

