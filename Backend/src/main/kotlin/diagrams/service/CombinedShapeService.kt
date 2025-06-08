package diagrams.service

import diagrams.entity.CombinedShape
import diagrams.entity.CustomSchema
import diagrams.repository.CombinedShapeRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CombinedShapeService(
    private val combinedShapeRepository: CombinedShapeRepository,
) {
    @Transactional
    fun saveCombinedShape(
        name: String,
        data: String,
        ownerId: Long,
    ): CombinedShape {
        val schema = CombinedShape(name, data, ownerId)
        return combinedShapeRepository.save(schema)
    }

    @Transactional
    fun getCombinedShape(id: Long): CombinedShape {
        return combinedShapeRepository.findById(id).orElseThrow {
            throw IllegalArgumentException("Combined shape with ID $id not found")
        }
    }

    fun getCombinedShapeByOwner(ownerId: Long): List<CombinedShape> {
        return combinedShapeRepository.findByOwnerId(ownerId)
    }
}