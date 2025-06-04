package diagrams.controller

import diagrams.entity.CustomSchema
import diagrams.service.CustomSchemaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/schemas")
class CustomSchemaController(private val customSchemaService: CustomSchemaService) {
    @PostMapping("/save")
    fun saveSchema(
        @RequestBody request: SaveSchemaRequest,
    ): ResponseEntity<CustomSchema> {
        val savedSchema = customSchemaService.saveCustomSchema(request.name, request.data, request.ownerId)
        return ResponseEntity.ok(savedSchema)
    }

    @GetMapping("/{id}")
    fun getSchema(
        @PathVariable id: Long,
    ): ResponseEntity<CustomSchema> {
        val schema = customSchemaService.getCustomSchema(id)
        return ResponseEntity.ok(schema)
    }

    @GetMapping("/user/{ownerId}")
    fun getSchemasByOwner(
        @PathVariable ownerId: Long,
    ): ResponseEntity<List<CustomSchema>> {
        val schemas = customSchemaService.getSchemasByOwner(ownerId)
        return ResponseEntity.ok(schemas)
    }
}

data class SaveSchemaRequest(
    val name: String,
    val data: String,
    val ownerId: Long,
)
