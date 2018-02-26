package net.swigg.concerted

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
	override fun configure(http: HttpSecurity?) {
		http?.let {
			http
			  .authorizeRequests()
			  .antMatchers("/login").authenticated()
			  .antMatchers("/**").anonymous()
			  .and()
			  .formLogin()
			  .loginPage("/login")
			  .and()
			  .csrf()
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		}
	}
}