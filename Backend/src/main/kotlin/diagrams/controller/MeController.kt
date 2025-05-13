package diagrams.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class MeController {
    @GetMapping("/me")
    fun me(principal: Principal?): Map<String, String?> {
        return mapOf("username" to principal?.name)
    }
}
