package diagrams.service

import diagrams.entity.Diagram
import diagrams.repository.DiagramRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class DiagramService(
    private val diagramRepository: DiagramRepository,
) {
    @Transactional
    fun saveDiagram(
        name: String,
        data: String,
        ownerId: Long,
    ): Diagram {
        val diagram = Diagram(name = name, diagramData = data, ownerId = ownerId)
        return diagramRepository.save(diagram)
    }

    @Transactional(readOnly = true)
    fun getDiagramById(id: Long): Diagram =
        diagramRepository
            .findById(id)
            .orElseThrow {
                throw IllegalArgumentException("Diagram with ID $id not found")
            }

    @Transactional
    fun updateDiagram(
        id: Long,
        name: String,
        data: String,
    ): Diagram {
        val diagram =
            diagramRepository.findById(id).orElseThrow {
                throw IllegalArgumentException("Diagram with ID $id not found")
            }
        diagram.name = name
        diagram.diagramData = data
        return diagramRepository.save(diagram)
    }

    @Transactional
    fun getDiagramsByOwnerId(id: Long): List<Diagram> {
        return diagramRepository.findAllByOwnerId(id)
    }
}
