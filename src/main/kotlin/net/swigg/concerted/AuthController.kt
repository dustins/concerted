package net.swigg.concerted

import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/auth"])
class AuthController {
	@RequestMapping("/authenticated")
	fun authenticated(): Any? {
		val authentication = SecurityContextHolder.getContext().authentication
		return when (authentication) {
			is AnonymousAuthenticationToken -> null
			else -> SimplifiedAuthentication(authentication)
		}
	}
}

class SimplifiedAuthentication(private val authentication: Authentication?) {
	val username: String? by lazy {
		val principal = authentication?.principal
		when (principal) {
			is UserDetails -> principal.username
			else -> null
		}
	}

	val roles: List<String> by lazy {
		(authentication?.let {
			authentication.authorities
		} ?: listOf<GrantedAuthority>()).map { it.toString() }
	}
}