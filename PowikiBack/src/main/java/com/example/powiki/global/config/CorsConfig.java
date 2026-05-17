package com.example.powiki.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.allowed.host}")
    private String host;

    @Value(("${cors.allowed.port}"))
    private int port;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String origin;

        if (port == 443 || port == 80) {
            origin = String.format("%s", host);
        } else {
            origin = String.format("%s:%d", host, port);
        }

        registry.addMapping("/**")
                .allowedOrigins(origin)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }
}
