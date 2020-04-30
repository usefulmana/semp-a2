package com.example.springsocial;

import com.example.springsocial.config.AppProperties;
import com.example.springsocial.model.AuthProvider;
import com.example.springsocial.model.Role;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@EnableJpaAuditing
public class SpringSocialApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringSocialApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder encoder){
		return args -> {
			Optional<User> user = userRepository.findByEmail("admin@gmail.com");
			if (!user.isPresent()){
				User admin = new User();
				admin.setName("Le Admin");
				admin.setPassword(encoder.encode("GAtech321!"));
				admin.setEmail("admin@gmail.com");
				admin.setUserName("a000001");
				admin.setEmailVerified(true);
				admin.setRole(Role.ROLE_ADMIN);
				admin.setProvider(AuthProvider.local);
				userRepository.save(admin);
			}
		};
	}
}
