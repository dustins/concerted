package net.swigg.concerted.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.util.matcher.AndRequestMatcher
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.security.web.util.matcher.RequestMatcher
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JSONUsernamePasswordAuthenticationFilter(defaultFilterProcessesUrl: String = "/login") :
  UsernamePasswordAuthenticationFilter() {
	init {
		setFilterProcessesUrl(defaultFilterProcessesUrl)
	}

	override fun setFilterProcessesUrl(filterProcessesUrl: String?) {
		setRequiresAuthenticationRequestMatcher(AndRequestMatcher(
		  AntPathRequestMatcher(filterProcessesUrl, HttpMethod.POST.name),
		  RequestMatcher { request ->
			  try {
				  MediaType.APPLICATION_JSON.includes(MediaType.parseMediaType(request.getHeader(HttpHeaders.CONTENT_TYPE)))
			  } catch (ex: IllegalArgumentException) {
				  false
			  }
		  }
		))
	}

	override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication? {
		return try {
			val objectMapper = ObjectMapper()
			val json = objectMapper.readTree(request.reader)
			val authToken = UsernamePasswordAuthenticationToken(
			  json.get(usernameParameter).asText(),
			  json.get(passwordParameter).asText()
			)

			setDetails(request, authToken)

			authenticationManager.authenticate(authToken)
		} catch (ex: AuthenticationException) {
			throw ex;
		} catch (t: Throwable) {
			throw BadCredentialsException("Unable to read credentials from request body.", t)
		}
	}
}