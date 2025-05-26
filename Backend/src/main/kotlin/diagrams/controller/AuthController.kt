package diagrams.controller

import diagrams.dto.AuthRequest
import diagrams.dto.RegisterRequest
import diagrams.jwtutil.JwtUtil
import diagrams.service.UserService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/")
class AuthController(
    private val userService: UserService,
    private val authenticationManager: AuthenticationManager,
    private val jwtUtil: JwtUtil,
    private val passwordEncoder: PasswordEncoder,
) {
    @PostMapping("/register")
    fun register(
        @RequestBody request: RegisterRequest,
        response: HttpServletResponse,
    ): ResponseEntity<String> {
        val user = userService.createUser(request.username, request.password)

        val token = jwtUtil.generateToken(user.id, request.username)
        val cookie =
            ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(60 * 60 * 24)
                .build()

        response.addHeader("Set-Cookie", cookie.toString())

        return ResponseEntity.ok("Registered and logged in")
    }

    @PostMapping("/login")
    fun login(
        @RequestBody request: AuthRequest,
        response: HttpServletResponse,
    ): ResponseEntity<Void> {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.username, request.password),
        )
        val user = userService.findByUsername(request.username)!!
        val token = jwtUtil.generateToken(user.id, user.username)

        // Устанавливаем cookie
        val cookie =
            ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true) // для HTTPS
                .sameSite("Strict")
                .path("/")
                .maxAge(3600)
                .build()

        response.addHeader("Set-Cookie", cookie.toString())

        return ResponseEntity.ok().build()
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Void> {
        val expiredCookie =
            ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build()

        response.addHeader("Set-Cookie", expiredCookie.toString())
        return ResponseEntity.ok().build()
    }
}
