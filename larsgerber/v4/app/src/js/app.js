"use strict";

// A few event listener
let object = document.getElementById("eventListener");

object.onload = function(){header()};
object.onscroll = function(){header()};
object.onresize = function(){header()};


// Hide Language Bar Mobil
$('#icon-right').toggleClass('display_none');


// Go to Quicklinks
$('.smooth-goto').on('click', function() {  
  $('html, body').animate({scrollTop: $(this.hash).offset().top - 0}, 1000);
  return false;
});


// Sticky Header
function header() {
  var HEADER = document.querySelector('header');
  var x = window.matchMedia("(max-width: 700px)");

  if (x.matches) { 
    var m = 0;
  } else {
    var m = 100;
  }
  
  if (window.pageYOffset >= m) {
    HEADER.classList.add('fixed');
  } else {
    HEADER.classList.remove('fixed');
  }
}


// Mobil Menu
function iconLeft() {
  let x = window.matchMedia("(max-width: 700px)");

  if (x.matches) { 
    $('#navigation').toggleClass('mobil-openNavbar');
    $('#icon-right').toggleClass('display_none');
  }
}


// Language Switch
function iconRight() {
  
  var url = window.location.pathname;
  var lang = url.substring(0,3);
  var path = url.substring(3);

  if (lang == "/de") {
    var link = ("/en" + path);
  }
  else {
    var link = ("/de" + path);
  }

  window.open(link,"_self"); 
}


//Code Copier
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