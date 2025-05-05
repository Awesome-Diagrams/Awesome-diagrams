package diagrams.configuration

import diagrams.jwtutil.JwtFilter
import diagrams.jwtutil.JwtUtil
import diagrams.service.UserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class FilterConfig {
    @Bean
    fun jwtFilter(
        jwtUtil: JwtUtil,
        userService: UserService,
    ): JwtFilter {
        return JwtFilter(jwtUtil, userService)
    }
}
