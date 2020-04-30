package com.example.springsocial.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;
import com.example.springsocial.util.GeneralUtils;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "username")
})
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "username", nullable = false, updatable = false)
    private String userName;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    // TODO Avatar Upload Functionality
    private String imageUrl = "https://materializecss.com/images/yuna.jpg";

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.ROLE_USER;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    @CreatedBy
    private String createdBy;

    @Column(name = "last_updated")
    @LastModifiedDate
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime lastUpdated;

    @Column(name = "last_updated_by")
    @LastModifiedBy
    private String lastUpdatedBy;

    public User(String password, String email, String name, Role role) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.role = role;
    }
}
