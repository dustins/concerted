package net.swigg.concerted

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter


@SpringBootApplication
class ConcertedApplication : WebMvcConfigurer {
	@Bean
	fun tuckyFilter(): FilterRegistrationBean<UrlRewriteFilter> {
		val filterRegistrationBean = FilterRegistrationBean<UrlRewriteFilter>()
		filterRegistrationBean.filter = UrlRewriteFilter()
		filterRegistrationBean.addInitParameter("confPath", "urlrewrite.xml")
		filterRegistrationBean.addInitParameter("confReloadCheckInterval", "0")

		return filterRegistrationBean
	}
}

fun main(args: Array<String>) {
	runApplication<ConcertedApplication>(*args)
}
