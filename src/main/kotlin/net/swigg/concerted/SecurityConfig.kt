package net.swigg.concerted

import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.util.matcher.AndRequestMatcher
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher
import org.springframework.security.web.util.matcher.RequestMatcher
import org.springframework.web.accept.HeaderContentNegotiationStrategy

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
	fun requestMatcher(): RequestMatcher {
		val contentTypeMatcher = MediaTypeRequestMatcher(HeaderContentNegotiationStrategy(), APPLICATION_JSON)
		contentTypeMatcher.setIgnoredMediaTypes(setOf(MediaType.ALL))

		return AndRequestMatcher(
		  AntPathRequestMatcher("/**"),
		  contentTypeMatcher
		)
	}

	override fun configure(http: HttpSecurity?) {
		http?.let {
			http
			  .authorizeRequests()
			  .antMatchers("/private").authenticated()
			  .antMatchers("/**").permitAll()
			  .and()
			  .formLogin()
			  .and()
			  .csrf()
			  .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
			  .and()
			  .logout()
			  .logoutRequestMatcher(AntPathRequestMatcher("/logout"))
		}
	}
}