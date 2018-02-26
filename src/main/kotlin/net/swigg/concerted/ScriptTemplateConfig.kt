package net.swigg.concerted

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.core.io.ClassPathResource
import org.springframework.web.servlet.ViewResolver
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver
import java.util.*

@Configuration
class ScriptTemplateConfig : WebMvcConfigurer {
	@Autowired
	lateinit var mapper: ObjectMapper

	@Bean
	fun scriptTemplateViewResolver(): ViewResolver {
		val registration = ScriptTemplateViewResolver()
		registration.order = Ordered.HIGHEST_PRECEDENCE
		registration.setPrefix("/public/")
		registration.setSuffix(".html")

		return registration
	}

	@Bean
	fun scriptTemplateConfigurer(): ScriptTemplateConfigurer {
		val engineName = "nashorn"
		val polyfillScript = "static/polyfill.js"
		val renderFunction = "render"

		val configurer = ScriptTemplateConfigurer()
		configurer.engineName = engineName
		configurer.setScripts(polyfillScript, getJSBundle())
		configurer.renderFunction = renderFunction
		configurer.isSharedEngine = false

		return configurer
	}

	private fun getJSBundle(): String {
		val prefixPath = "public/"
		val manifestName = "asset-manifest.json"
		val serverScript = "server.js"

		val manifestResource = ClassPathResource(prefixPath + manifestName)
		val typeRef = object : TypeReference<HashMap<String, String>>() {}
		val manifest: Map<String, String> = mapper.readValue(manifestResource.inputStream, typeRef)

		return prefixPath + manifest[serverScript]
	}
}