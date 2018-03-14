package net.swigg.concerted

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver
import org.thymeleaf.templatemode.TemplateMode
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

	override fun addCorsMappings(registry: CorsRegistry) {
		registry.addMapping("/**")
		  .allowCredentials(true)
		  .allowedHeaders("*")
		  .allowedMethods("*")
		  .allowedOrigins("https://localhost:8080", "https://c5ac6e5b39ce4f1eba915667ffce85ec.vfs.cloud9.us-east-1.amazonaws.com")
	}

	/**
	 * Create an additional template resolver so Thymeleaf can resolve templates from classpath:/public/
	 */
	@Bean
	fun thymeleafTemplateResolver(thymeleafProperties: ThymeleafProperties, applicationContext: ApplicationContext):
	  SpringResourceTemplateResolver {
		return SpringResourceTemplateResolver().apply {
			this.setApplicationContext(applicationContext)
			this.prefix = "classpath:/public/"
			this.suffix = thymeleafProperties.suffix
			this.templateMode = TemplateMode.valueOf(thymeleafProperties.mode)
			thymeleafProperties.encoding?.let {
				this.characterEncoding = thymeleafProperties.encoding.name()
			}
			this.isCacheable = thymeleafProperties.isCache
			thymeleafProperties.templateResolverOrder?.let {
				this.order = thymeleafProperties.templateResolverOrder
			}
			this.checkExistence = thymeleafProperties.isCheckTemplate
		}
	}
}

fun main(args: Array<String>) {
	runApplication<ConcertedApplication>(*args)
}
