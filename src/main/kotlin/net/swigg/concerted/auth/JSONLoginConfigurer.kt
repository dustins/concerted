package net.swigg.concerted.auth

import net.swigg.concerted.ExceptionHandlingConfigurerResolver
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.config.annotation.web.HttpSecurityBuilder
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.authentication.ForwardAuthenticationSuccessHandler
import org.springframework.security.web.util.matcher.AndRequestMatcher
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher
import org.springframework.security.web.util.matcher.RequestMatcher
import org.springframework.web.accept.ContentNegotiationStrategy

class JSONLoginConfigurer<H : HttpSecurityBuilder<H>> : AbstractAuthenticationFilterConfigurer<H,
  JSONLoginConfigurer<H>, JSONUsernamePasswordAuthenticationFilter>(JSONUsernamePasswordAuthenticationFilter(),
  null), ExceptionHandlingConfigurerResolver<H> {
	init {
		successHandler { request, response, authentication ->
			response.status = HttpStatus.OK.value()
		}

		failureHandler { request, response, exception ->
			when (exception) {
				is BadCredentialsException -> response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus
				  .UNAUTHORIZED.reasonPhrase)
				else -> response.sendError(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN.reasonPhrase)
			}
		}
	}

	override fun createLoginProcessingUrlMatcher(loginProcessingUrl: String?): RequestMatcher {
		return AndRequestMatcher(
		  AntPathRequestMatcher(loginProcessingUrl, HttpMethod.POST.name),
		  RequestMatcher { request ->
			  try {
				  MediaType.APPLICATION_JSON.includes(MediaType.parseMediaType(request.getHeader(HttpHeaders.CONTENT_TYPE)))
			  } catch (ex: IllegalArgumentException) {
				  false
			  }
		  }
		)
	}

	override public fun loginPage(loginPage: String?): JSONLoginConfigurer<H> {
		return super.loginPage(loginPage)
	}

	fun usernameParameter(usernameParameter: String): JSONLoginConfigurer<H> {
		authenticationFilter.usernameParameter = usernameParameter
		return this
	}

	fun passwordParameter(passwordParameter: String): JSONLoginConfigurer<H> {
		authenticationFilter.passwordParameter = passwordParameter
		return this
	}

	fun successForwardUrl(forwardUrl: String): JSONLoginConfigurer<H> {
		successHandler(ForwardAuthenticationSuccessHandler(forwardUrl))
		return this
	}

	override fun init(http: H) {
		this.getConfigurer(http)?.let { exceptionHandlingConfigurer ->
			val contentNegotiationStrategy = ContentNegotiationStrategy { request ->
				MediaType.parseMediaTypes(request.getHeader(HttpHeaders.CONTENT_TYPE))
			}

			val mediaMatcher = MediaTypeRequestMatcher(contentNegotiationStrategy, MediaType.APPLICATION_JSON)
			mediaMatcher.setIgnoredMediaTypes(setOf(MediaType.ALL, MediaType.APPLICATION_XHTML_XML,
			  MediaType("image", "*"), MediaType("text", "*")))

			exceptionHandlingConfigurer.defaultAuthenticationEntryPointFor(
			  postProcess(AuthenticationEntryPoint { request, response, authException ->
				  response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.reasonPhrase)
			  }), mediaMatcher)
		}
	}
}