package com.example.springsocial.repository;

import com.example.springsocial.model.LoggedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoggedUserRepo extends JpaRepository<LoggedUser, String> {
    Optional<LoggedUser> findByUserName(String userName);
}
