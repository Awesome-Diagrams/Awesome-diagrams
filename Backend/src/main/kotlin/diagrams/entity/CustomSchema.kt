package diagrams.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.ColumnTransformer
import java.time.LocalDateTime

@Entity
@Table(name = "custom_schema")
data class CustomSchema(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(nullable = false)
    var name: String = "",
    @Column(name = "schema_data", columnDefinition = "jsonb", nullable = false)
    @ColumnTransformer(write = "?::jsonb")
    var diagramData: String,
    @Column(name = "owner_id")
    var ownerId: Long,
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
) {
    constructor() : this(0, "", "", 0, LocalDateTime.now())
    constructor(name: String, diagramData: String, ownerId: Long) : this(0, name, diagramData, ownerId, LocalDateTime.now())
}
