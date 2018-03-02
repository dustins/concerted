package net.swigg.concerted;

import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;

public interface ExceptionHandlingConfigurerResolver<H extends HttpSecurityBuilder<H>> {
    default ExceptionHandlingConfigurer<H> getConfigurer(H http) {
        return http.getConfigurer(ExceptionHandlingConfigurer.class);
    }
}
