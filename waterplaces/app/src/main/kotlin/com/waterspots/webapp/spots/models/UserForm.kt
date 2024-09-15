package com.waterspots.webapp.spots.models

class UserForm {
    var fname: String = ""
    var lname: String = ""
    var email: String = ""
    var subject: String = ""
}

internal fun UserForm.asUser(): User {
    return User(fname, lname, subject, email)
}