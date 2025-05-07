package diagrams.service

import diagrams.entity.User
import diagrams.repository.UserRepository
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) : UserDetailsService {
    fun createUser(
        username: String,
        password: String,
    ): User {
        val user =
            User(
                username = username,
                password = passwordEncoder.encode(password),
            )
        return userRepository.save(user)
    }

    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username).orElse(null)
    }

    override fun loadUserByUsername(username: String): UserDetails {
        return userRepository.findByUsername(username)
            .map { user ->
                org.springframework.security.core.userdetails.User(
                    user.username,
                    user.password,
                    listOf(SimpleGrantedAuthority("ROLE_${user.role}")),
                )
            }
            .orElseThrow { UsernameNotFoundException("User not found") }
    }
}
