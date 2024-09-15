package com.waterspots.webapp

import com.waterspots.webapp.spots.models.UserForm
import com.waterspots.webapp.spots.models.UserRepository
import com.waterspots.webapp.spots.models.asUser
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.ModelAndView

@Controller
class ContactController(val userRepository: UserRepository) {
    val logger = LoggerFactory.getLogger(ContactController::class.java)
    @RequestMapping("/contact", method = [RequestMethod.GET])
    fun getURLValueFromContact(model: Model): String {
        val form = UserForm()
        model.addAttribute("contactForm", form)
        return "contact"
    }

    @RequestMapping("/send", method = [RequestMethod.POST])
    fun createMessage(model: Model, @ModelAttribute("contactForm") userForm: UserForm): String {
        userRepository.createMessage(userForm.asUser())
        return "contact"
    }

    @RequestMapping("/AdminPortal/messages", method = [RequestMethod.GET])
    fun showMessages(): ModelAndView {
        val modelAndView = ModelAndView()
        modelAndView.viewName = "messages"
        modelAndView.addObject("messages", userRepository.getAllUsers())
        return modelAndView
    }
}
