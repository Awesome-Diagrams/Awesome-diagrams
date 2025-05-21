package diagrams.repository

import diagrams.entity.CustomSchema
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomSchemaRepository : JpaRepository<CustomSchema, Long> {
    fun findByOwnerId(ownerId: Long): List<CustomSchema>
}
