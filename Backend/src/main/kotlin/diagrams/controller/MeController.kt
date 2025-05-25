package diagrams.controller

import diagrams.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class MeController(
    private val userService: UserService,
) {
    @GetMapping("/me")
    fun me(principal: Principal?): ResponseEntity<Map<String, Any?>> {
        val user = principal?.name?.let { userService.findByUsername(it) }
        return ResponseEntity.ok(mapOf("id" to user?.id, "username" to user?.username))
    }
}
