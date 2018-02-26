package net.swigg.concerted

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
	override fun configure(http: HttpSecurity?) {
		http?.let {
			http
			  .authorizeRequests()
			  .antMatchers("/**").anonymous()
			  .and()
			  .formLogin()
			  .and()
			  .csrf().disable()
		}
	}
}