package diagrams.controller

import diagrams.entity.Diagram
import diagrams.service.DiagramService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/diagrams")
class DiagramController(
    private val diagramService: DiagramService,
) {
    @CrossOrigin(origins = ["http://localhost:5173"])
    @PostMapping
    fun saveDiagram(
        @RequestBody request: SaveDiagramRequest,
    ): ResponseEntity<Diagram> {
        val savedDiagram = diagramService.saveDiagram(request.name, request.data)
        return ResponseEntity.ok(savedDiagram)
    }

    @CrossOrigin(origins = ["http://localhost:5173"])
    @GetMapping("/{id}")
    fun getDiagram(
        @PathVariable id: Long,
    ): ResponseEntity<Diagram> {
        val diagram = diagramService.getDiagramById(id)
        return ResponseEntity.ok(diagram)
    }

    @CrossOrigin(origins = ["http://localhost:5173"])
    @PostMapping("/{id}")
    fun updateDiagram(
        @PathVariable id: Long,
        @RequestBody request: SaveDiagramRequest,
    ): ResponseEntity<Diagram> {
        val updatedDiagram = diagramService.updateDiagram(id, request.name, request.data)
        return ResponseEntity.ok(updatedDiagram)
    }
}

data class SaveDiagramRequest(
    val name: String,
    val data: String,
)
