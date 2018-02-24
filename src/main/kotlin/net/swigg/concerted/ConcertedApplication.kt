package net.swigg.concerted

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer

@SpringBootApplication
class ConcertedApplication {
    
    @Bean
    fun scriptTemplateConfigurer(): ScriptTemplateConfigurer {
        val configurer = ScriptTemplateConfigurer();
        configurer.setEngineName("nashorn");
        configurer.setScripts("static/polyfill.js", "public/server.js");
        configurer.setRenderFunction("render");
        configurer.setSharedEngine(false);
        return configurer;
    }
}

@Configuration
class WebFluxConfiguration : WebFluxConfigurer {
    @Override
    fun configureViewResolvers(registry: ViewResolverRegistry): Unit {
    println("reigster");
    }
}

fun main(args: Array<String>) {
    runApplication<ConcertedApplication>(*args)
}
