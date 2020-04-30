package com.example.springsocial.repository;

import com.example.springsocial.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<ConfirmationToken, String> {
    Optional<ConfirmationToken> findByToken(String token);
    Optional<ConfirmationToken> findByUser_Id(String id);
}
