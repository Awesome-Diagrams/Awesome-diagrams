package diagrams.repository

import diagrams.entity.CombinedShape
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CombinedShapeRepository : JpaRepository<CombinedShape, Long> {
    fun findByOwnerId(ownerId: Long): List<CombinedShape>
}
