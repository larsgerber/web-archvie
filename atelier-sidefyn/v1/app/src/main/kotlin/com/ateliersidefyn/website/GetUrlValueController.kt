package com.ateliersidefyn.website

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import javax.servlet.http.HttpServletRequest


@Controller
class GetUrlValueController {

    @GetMapping("/")
    fun getURLValueFromIndex(request: HttpServletRequest): String {
        return "index"
    }

    @GetMapping("/about")
    fun getURLValueFromAbout(request: HttpServletRequest): String {
        return "about"
    }

    @GetMapping("/agb")
    fun getURLValueFromAgb(request: HttpServletRequest): String {
        return "agb"
    }

    @GetMapping("/contact")
    fun getURLValueFromContact(request: HttpServletRequest): String {
        return "contact"
    }

    @GetMapping("/costs")
    fun getURLValueFromCosts(request: HttpServletRequest): String {
        return "costs"
    }

    @GetMapping("/deals")
    fun getURLValueFromDeals(request: HttpServletRequest): String {
        return "deals"
    }

    @GetMapping("/guidance")
    fun getURLValueFromGuidance(request: HttpServletRequest): String {
        return "guidance"
    }

    @GetMapping("/horse-riding")
    fun getURLValueFromHorseriding(request: HttpServletRequest): String {
        return "horse-riding"
    }

    @GetMapping("/latest")
    fun getURLValueFromLatest(request: HttpServletRequest): String {
        return "latest"
    }

    @GetMapping("/impressum")
    fun getURLValueFromImpressum(request: HttpServletRequest): String {
        return "impressum"
    }
}

