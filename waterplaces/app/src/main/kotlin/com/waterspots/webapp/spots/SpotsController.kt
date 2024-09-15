package com.waterspots.webapp.spots

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView


@Controller
@RequestMapping("/spots", method = [RequestMethod.GET])
class SpotsController(private val spotRepository: SpotRepository) {

    @GetMapping
    fun spots(): ModelAndView {
        val modelAndView = ModelAndView()

        modelAndView.addObject("spots", spotRepository.getAllSpots())

        modelAndView.viewName = "spots"

        return modelAndView
    }

    @RequestMapping("{spotTitle}", method = [RequestMethod.GET])
    fun showDetailview(@PathVariable("spotTitle") spotTitle: String, model: Model): String {
        try {
            val spot = spotRepository.getSpotByName(spotTitle)
            model.addAttribute("spot", spot)
        } catch (e: NoSuchElementException) {
            throw SpotNotFoundException()
        }
        return "detailview"
    }
}

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "spot not found")
class SpotNotFoundException : NoSuchElementException()