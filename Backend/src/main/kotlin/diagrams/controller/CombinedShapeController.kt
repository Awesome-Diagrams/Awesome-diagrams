package diagrams.controller

import diagrams.entity.CombinedShape
import diagrams.service.CombinedShapeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping("/combined-shape")
class CombinedShapeController(
    private val combinedShapeService: CombinedShapeService,
) {
    @CrossOrigin(origins = ["http://localhost:5173"])
    @PostMapping("/save")
    fun saveCombinedShape(
        @RequestBody request: SaveSchemaRequest,
    ): ResponseEntity<CombinedShape> {
        val savedSchema = combinedShapeService.saveCombinedShape(request.name, request.data, request.ownerId)
        return ResponseEntity.ok(savedSchema)
    }

    @GetMapping("/{id}")
    fun getCombinedShape(
        @PathVariable id: Long,
    ): ResponseEntity<CombinedShape> {
        val schema = combinedShapeService.getCombinedShape(id)
        return ResponseEntity.ok(schema)
    }

    @GetMapping("/user/{ownerId}")
    fun getSchemasByOwner(
        @PathVariable ownerId: Long,
    ): ResponseEntity<List<CombinedShape>> {
        val schemas = combinedShapeService.getCombinedShapeByOwner(ownerId)
        return ResponseEntity.ok(schemas)
    }
}

data class SaveCombinedShapeRequest(
    val name: String,
    val data: String,
    val ownerId: Long,
)
