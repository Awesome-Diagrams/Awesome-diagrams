package diagrams.service

import diagrams.entity.CustomSchema
import diagrams.repository.CustomSchemaRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CustomSchemaService(
    private val customSchemaRepository: CustomSchemaRepository,
) {
    @Transactional
    fun saveCustomSchema(
        name: String,
        data: String,
        ownerId: Long,
    ): CustomSchema {
        val schema = CustomSchema(name, data, ownerId)
        return customSchemaRepository.save(schema)
    }

    @Transactional
    fun getCustomSchema(id: Long): CustomSchema {
        return customSchemaRepository.findById(id).orElseThrow {
            throw IllegalArgumentException("Schema with ID $id not found")
        }
    }

    fun getSchemasByOwner(ownerId: Long): List<CustomSchema> {
        return customSchemaRepository.findByOwnerId(ownerId)
    }
}
