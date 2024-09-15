package com.waterspots.webapp

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

    @GetMapping("/impressum")
    fun getURLValueFromImpressum(request: HttpServletRequest): String {
        return "impressum"
    }

    @GetMapping("/sendspot")
    fun getURLValueFromSendspot(request: HttpServletRequest): String {
        return "sendspot"
    }

    @GetMapping("/findspot")
    fun getURLValueFromFindspot(request: HttpServletRequest): String {
        return "findspot"
    }

    @GetMapping("/danke")
    fun token(request: HttpServletRequest): String {
        return "danke.html"
    }
}

