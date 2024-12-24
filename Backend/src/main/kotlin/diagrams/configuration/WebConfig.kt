package diagrams.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") // Разрешить CORS для всех маршрутов
            .allowedOrigins("http://localhost:5173") // Укажите ваш фронтенд-домен
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешенные методы
            .allowedHeaders("*") // Разрешенные заголовки
            .allowCredentials(true) // Разрешить отправку куки
    }
}
