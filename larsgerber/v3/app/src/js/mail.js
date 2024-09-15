"use strict";

document.getElementById("my_captcha_form").addEventListener("submit", function (evt) {
    evt.preventDefault();

    //Valid e-mail format.
    let mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //Get values from form.
    let a = document.forms["my_captcha_form"]["name"].value;
    let b = document.forms["my_captcha_form"]["email"].value;
    let c = document.forms["my_captcha_form"]["subject"].value;
    let d = document.forms["my_captcha_form"]["body"].value;
    let e = document.forms["my_captcha_form"]["g-recaptcha-response"].value;


    //Check if no value or not a valid e-mail is set.
    if ((a.length == 0) || (!(b.match(mailformat))) || (c.length == 0) || (d.length == 0)) {
        if (a.length == 0) { notValid('input-field-name'); }
        else { Valid('input-field-name'); }

        if (!(b.match(mailformat))) { notValid('input-field-email'); }
        else { Valid('input-field-email'); }

        if (c.length == 0) { notValid('input-field-subject'); }
        else { Valid('input-field-subject'); }

        if (d.length == 0) { notValid('input-field-body'); }
        else { Valid('input-field-body'); }
    }
    else {

        //Reset input border color.
        Valid('input-field-name');
        Valid('input-field-email');
        Valid('input-field-subject');
        Valid('input-field-body');

        //Show captcha
        var captcha = document.getElementById("g-recaptcha");
        captcha.style.display = "flex";

        //Loading animation
        var button = document.getElementById("submit-button");
        button.classList.add("onclic");

        //Check if captcha was filled out.
        var response = grecaptcha.getResponse();
        if (response.length == 0) {

            //Stop loading animation and enable button.
            button.classList.remove("onclic");
            button.disabled = false;
            return false;

        } else {

            //Hide captcha and disable button.
            button.disabled = true;
            captcha.style.display = "none";

            $.ajax({
                type: "POST",
                url: '/send',
                data: {
                    name: a,
                    email: b,
                    subject: c,
                    body: d,
                    key: e
                }
            })
            .done(function (data) {
                var data = JSON.parse(data);
                if (data.status == 'success') {
                    button.classList.remove("onclic");
                    button.classList.add("validate");
                }
                else {
                    button.classList.remove("onclic");
                    button.disabled = false;
                    captcha.style.display = "flex";
                    alert("ERROR BRUH!");
                }
            });
        }
    }
});

function notValid(i) {
    var ii = document.getElementById(i);
    ii.classList.add("notvalid");
    ii.classList.remove("valid");
}

function Valid(i) {
    var ii = document.getElementById(i);
    ii.classList.remove("notvalid");
    ii.classList.add("valid");
}

$('#input-field-body').on('change keydown keyup paste cut', 'textarea', function () {
    $(this).height(0).height(this.scrollHeight + 2);
    if ($(this).height() >= 250) {
        $('textarea#body').css("overflow", "auto");
    }
    else {
        $('textarea#body').css("overflow", "hidden");
    }
}).find('textarea#body').change();