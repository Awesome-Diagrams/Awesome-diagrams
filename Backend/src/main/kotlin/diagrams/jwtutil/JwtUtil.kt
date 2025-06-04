package diagrams.jwtutil

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.Date

@Component
class JwtUtil(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration}") private val expiration: Long,
) {
    fun generateToken(
        userId: Long,
        username: String,
    ): String {
        return JWT.create()
            .withSubject(username)
            .withClaim("userId", userId)
            .withExpiresAt(Date(System.currentTimeMillis() + expiration))
            .sign(Algorithm.HMAC256(secret))
    }

    fun validateToken(token: String): Boolean {
        try {
            JWT.require(Algorithm.HMAC256(secret)).build().verify(token)
            return true
        } catch (e: Exception) {
            return false
        }
    }

    fun getUserIdFromToken(token: String): Long {
        return JWT.require(Algorithm.HMAC256(secret)).build().verify(token).getClaim("userId").asLong()
    }

    fun getUsernameFromToken(token: String): String {
        return JWT.require(Algorithm.HMAC256(secret)).build().verify(token).subject
    }
}
