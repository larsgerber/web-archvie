"use strict";

let object = document.getElementById("eventListener");

object.onload = function(){header()};
object.onscroll = function(){header()};
object.onresize = function(){header()};

$('#icon-right').toggleClass('display_none');

$('.en').hide();

$('.smooth-goto').on('click', function() {  
  $('html, body').animate({scrollTop: $(this.hash).offset().top - 0}, 1000);
  return false;
});

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

function iconLeft() {
  let x = window.matchMedia("(max-width: 700px)");

  if (x.matches) { 

    $('#navigation').toggleClass('mobil-openNavbar');
    $('#icon-right').toggleClass('display_none');
  }
}

function iconRight() {
  let element = document.getElementById('flag');

  if (element.alt === "Deutsch"){
    element.alt = "English";
    element.src = "https://dev01.larsgerber.ch/img/svg/germany.svg";

    $('.de').hide();
    $('.en').show();
  }
  else {
    element.alt = "Deutsch";
    element.src = "https://dev01.larsgerber.ch/img/svg/america.svg";
  
    $('.en').hide();
    $('.de').show();
  }
}

$(".blog-category").click(function () {
  window.location = $(this).find("a").attr("href");
  return false;
});

async function copy(codeID,copyID) {
  document.getElementById(copyID).removeAttribute("onclick");

  var range = document.createRange();
  range.selectNode(document.getElementById(codeID));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  
  let element = document.getElementById(copyID);
  element.classList.add("active");
  await new Promise(resolve => setTimeout(resolve, 1000));
  element.classList.remove("active");
  document.getElementById(copyID).setAttribute("onclick", `copy('${codeID}','${copyID}')`);
}