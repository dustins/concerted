package net.swigg.concerted

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
	override fun configure(http: HttpSecurity?) {
		http?.let {
			http
			  .authorizeRequests()
			  .antMatchers("/private1").authenticated()
			  .antMatchers("/private2").hasRole("ADMIN")
			  .antMatchers("/**").permitAll()
			  .and()
			  .apply(JSONLoginConfigurer<HttpSecurity>())
			  .loginPage("/login")
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

