package com.waterspots.webapp.spots

import com.waterspots.webapp.spots.models.User
import com.waterspots.webapp.spots.models.UserRepository
import org.springframework.stereotype.Repository

@Repository
class WebUserRepository(private var users: MutableList<User> = mutableListOf()) : UserRepository {


    override fun createMessage(userToCreate: User): Boolean {
        return users.add(userToCreate)
    }

    override fun getAllUsers(): List<User> {
        return users
    }
}