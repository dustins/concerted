package net.swigg.concerted

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import java.util.concurrent.Executors
import javax.servlet.http.HttpServletRequest

val globalScheduledThreadPool = Executors.newScheduledThreadPool(20)

@Controller
class ErrorController {
	@RequestMapping("/notFound")
	fun notFound(request: HttpServletRequest): ModelAndView {
		val mapper = ObjectMapper()
		val authentication = SecurityContextHolder.getContext().authentication
		val principal = 		when (authentication) {
			is AnonymousAuthenticationToken -> null
			else -> SimplifiedAuthentication(authentication)
		}

		return ModelAndView("index", mapOf(
		  "executor" to globalScheduledThreadPool,
		  "request" to mapOf(
			"location" to request.getAttribute("javax.servlet.forward.request_uri")
		  ),
		  "initialState" to """{
			"authentication": {
				"isRequesting": false,
				"failure": null,
				"principal": ${mapper.writeValueAsString(principal)}
			}
		  }"""
		))
	}
}