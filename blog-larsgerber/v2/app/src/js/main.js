$('.nav-toggle').on('click', function () {
    $(this).toggleClass('open');
    $('.menu-left').toggleClass('collapse');
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 750);

function hasScrolled() {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight) {
        $('header').removeClass('show-nav').addClass('hide-nav');
        $('.nav-toggle').removeClass('open');
        $('.menu-left').removeClass('collapse');
    } else {
        $('header').removeClass('hide-nav').addClass('show-nav');
    }
    lastScrollTop = st;
}

// iframe container
$("iframe").wrap('<div class="iframe-container">');

// code copy button
$('pre').before('<div class="copy" onclick="copy(this)"></div>');

// code copier
async function copy(copy) {

    var code = copy.nextElementSibling
    copy.removeAttribute('onclick');
    var range = document.createRange();
    range.selectNode(code);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    copy.classList.add('active');
    await new Promise(resolve => setTimeout(resolve, 1000));
    copy.classList.remove('active');
    copy.setAttribute('onclick', 'copy(this)');
}

// loader
$(window).on("load", function () {
    setTimeout(function () {
        $(".loader-wrapper").fadeOut("slow");
    }, 0);
});