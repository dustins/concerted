package net.swigg.concerted

import net.swigg.concerted.auth.JSONLoginConfigurer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.util.matcher.AntPathRequestMatcher


@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
	@Bean
	public override fun userDetailsService(): UserDetailsService {
		// ensure the passwords are encoded properly
		val users = User.withDefaultPasswordEncoder()
		val manager = InMemoryUserDetailsManager()
		manager.createUser(users.username("user").password("user").roles("USER").build())
		manager.createUser(users.username("admin").password("admin").roles("USER", "ADMIN").build())
		return manager
	}

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
			  .successForwardUrl("/auth/authenticated")
			  .and()
//			  .formLogin()
//			  .and()
			  .csrf()
			  .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
			  .and()
			  .logout()
			  .logoutRequestMatcher(AntPathRequestMatcher("/logout"))
		}
	}
}

