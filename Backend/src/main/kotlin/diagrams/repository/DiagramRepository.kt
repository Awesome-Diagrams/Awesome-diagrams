package diagrams.repository

import diagrams.entity.Diagram
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface DiagramRepository : JpaRepository<Diagram, Long> {
    @Query("SELECT d FROM Diagram d WHERE :ownerId = d.ownerId")
    fun findAllByOwnerId(
        @Param("ownerId") ownerId: Long,
    ): List<Diagram>
}
