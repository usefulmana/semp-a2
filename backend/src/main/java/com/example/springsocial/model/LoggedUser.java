package com.example.springsocial.model;

import com.example.springsocial.util.GeneralUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "logged_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoggedUser {

    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "email")
    private String userEmail;

    @Column(name = "username")
    private String userName;

    @Column(name = "last_logged_in")
    private LocalDateTime lastLoggedIn = LocalDateTime.now();


}
