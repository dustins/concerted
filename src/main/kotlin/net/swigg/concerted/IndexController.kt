package net.swigg.concerted

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.RequestMapping
import javax.servlet.http.HttpServletRequest

@Controller
class IndexController {
	@Autowired
	lateinit var mapper: ObjectMapper

	@RequestMapping(path = ["/", "/login", "/about"])
	fun index(model: Model, request: HttpServletRequest): String {
		val authentication = SecurityContextHolder.getContext().authentication
		val state = ConcertedState(authentication)
		model.set("preloadedState", mapper.writeValueAsString(state))

		return "index"
	}

	@RequestMapping(path = ["/private1", "/private2"])
	fun private(model: Model, request: HttpServletRequest): String {
		return "index/private"
	}
}

class ConcertedState(private val auth: Authentication) {
	val authentication = object {
		val principal: SimplifiedAuthentication? by lazy {
			when (auth) {
				is AnonymousAuthenticationToken -> null
				else -> SimplifiedAuthentication(auth)
			}
		}
	}
}