package net.swigg.concerted

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.RequestMapping
import javax.servlet.http.HttpServletRequest
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService

@Controller
class IndexController {
	@Autowired
	lateinit var mapper: ObjectMapper

//	@RequestMapping(path = ["/"])
//	fun index(model: Model, request: HttpServletRequest): String {
//		model.set("request", mapOf(
//		  "location" to request.servletPath
//		))
//
//		val authentication = SecurityContextHolder.getContext().authentication
//		model.set("initialState", mapper.writeValueAsString(ConcertedState(authentication)))
//
//		return "index"
//	}

	@RequestMapping(path = ["/private1", "/private2"])
	fun private(model: Model, request: HttpServletRequest): String {
		return "index/private"
	}
}

class ConcertedState(private val auth: Authentication) {
	val authentication: SimplifiedAuthentication? by lazy {
		when (auth) {
			is AnonymousAuthenticationToken -> null
			else -> SimplifiedAuthentication(auth)
		}
	}
}