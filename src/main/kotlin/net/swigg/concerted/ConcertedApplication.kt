package net.swigg.concerted

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.server.ErrorPage
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.http.HttpStatus
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.tuckey.web.filters.urlrewrite.Conf
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter
import javax.servlet.FilterConfig


@SpringBootApplication
class ConcertedApplication : WebMvcConfigurer {
	@Bean
	fun containerCustomizer(): ConfigurableServletWebServerFactory {
		return TomcatServletWebServerFactory().apply {
			errorPages.add(ErrorPage(HttpStatus.NOT_FOUND, "/notFound"))
		}
	}

	@Bean
	fun tuckyFilter(): FilterRegistrationBean<UrlRewriteFilter> {
		val filterRegistrationBean = FilterRegistrationBean<UrlRewriteFilter>()
		filterRegistrationBean.filter = object : UrlRewriteFilter() {
//			override fun loadUrlRewriter(filterConfig: FilterConfig?) {
//				val confPath = "/WEB-INF/urlrewrite.xml"
//				val inputStream = ClassPathResource("/WEB-INF/urlrewrite.xml").inputStream
//				checkConf(Conf(filterConfig?.servletContext, inputStream, confPath, null, false))
//			}


		}
		filterRegistrationBean.addInitParameter("confPath", "urlrewrite.xml")
		filterRegistrationBean.addInitParameter("confReloadCheckInterval", "0")

		return filterRegistrationBean
	}
}

fun main(args: Array<String>) {
	runApplication<ConcertedApplication>(*args)
}
