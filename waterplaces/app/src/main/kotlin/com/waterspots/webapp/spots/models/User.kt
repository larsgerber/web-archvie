package com.waterspots.webapp.spots.models

data class User(
        val fname: String,
        val lname: String,
        val subject: String,
        val email: String
)

interface UserRepository {
    fun createMessage(userToCreate: User): Boolean
    fun getAllUsers(): List<User>

}
