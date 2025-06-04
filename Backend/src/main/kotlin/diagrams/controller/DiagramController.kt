package diagrams.controller

import diagrams.entity.Diagram
import diagrams.entity.User
import diagrams.jwtutil.JwtUtil
import diagrams.service.DiagramService
import diagrams.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/diagrams")
class DiagramController(
    private val diagramService: DiagramService,
    private val userService: UserService,
    private val jwtUtil: JwtUtil,
) {
    private val logger = LoggerFactory.getLogger(DiagramController::class.java)

    @CrossOrigin(origins = ["http://localhost:5173"])
    @PostMapping
    fun saveDiagram(
        @RequestBody request: SaveDiagramRequest,
    ): ResponseEntity<Diagram> {
        val savedDiagram = diagramService.saveDiagram(request.name, request.data, request.ownerId)
        return ResponseEntity.ok(savedDiagram)
    }

    @CrossOrigin(origins = ["http://localhost:5173"])
    @GetMapping("/by-id/{id}")
    fun getDiagram(
        @PathVariable id: Long,
        request: HttpServletRequest,
    ): ResponseEntity<Diagram> {
//        val currentUser = getCurrentUser(request)

        val diagram = diagramService.getDiagramById(id)
//        logger.warn("CURRENT USER ID: ${currentUser.id}")
        return ResponseEntity.ok(diagram)
    }

    @CrossOrigin(origins = ["http://localhost:5173"])
    @PostMapping("/by-id/{id}")
    fun updateDiagram(
        @PathVariable id: Long,
        @RequestBody request: SaveDiagramRequest,
    ): ResponseEntity<Diagram> {
        val updatedDiagram = diagramService.updateDiagram(id, request.name, request.data)
        return ResponseEntity.ok(updatedDiagram)
    }

    @GetMapping("/mine")
    fun getMyDiagrams(request: HttpServletRequest): ResponseEntity<List<Diagram>> {
        val auth = SecurityContextHolder.getContext().authentication
        val username = auth?.name ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val user =
            userService.findByUsername(username)
                ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()

        val diagrams = diagramService.getDiagramsByOwnerId(user.id)
        return ResponseEntity.ok(diagrams)
    }

    fun getCurrentUser(request: HttpServletRequest): User {
        val token =
            request.cookies?.find { it.name == "jwt" }?.value
                ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "JWT cookie not found")

        val username = jwtUtil.getUsernameFromToken(token)

        return userService.findByUsername(username)
            ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found")
    }
}

data class SaveDiagramRequest(
    val name: String,
    val data: String,
    val ownerId: Long,
)
