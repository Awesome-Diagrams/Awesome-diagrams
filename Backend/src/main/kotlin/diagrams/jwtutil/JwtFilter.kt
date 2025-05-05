package diagrams.jwtutil

import diagrams.service.UserService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter

class JwtFilter(
    private val jwtUtil: JwtUtil,
    private val userService: UserService,
) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val path = request.servletPath
        if (path == "/login" || path == "/register") {
            // Пропускаем фильтр для login и register
            filterChain.doFilter(request, response)
            return
        }

        val token = extractToken(request)

        if (token != null && jwtUtil.validateToken(token)) {
            val username = jwtUtil.getUsernameFromToken(token)

            val userDetails = userService.loadUserByUsername(username)

            val authentication =
                UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities,
                )
            authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

            SecurityContextHolder.getContext().authentication = authentication
        }

        filterChain.doFilter(request, response)
    }

    private fun extractToken(request: HttpServletRequest): String? {
        return request.cookies?.firstOrNull { it.name == "token" }?.value
    }
}
