package com.example.springsocial.model;

import com.example.springsocial.util.GeneralUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Entity
@Table(name = "tokens")
@Data
@NoArgsConstructor
public class ConfirmationToken {

    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "token", updatable = false)
    private String token;

    @Column(name = "type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private Token type;

    @Column(name = "issued_date", updatable = false)
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime issuedDateTime;

    @Column(name = "expired_date", updatable = false)
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime expiredDateTime;

    @Column(name = "confirmed_date")
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime confirmedDateTime;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public ConfirmationToken(User user) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
        this.issuedDateTime = LocalDateTime.now(ZoneOffset.UTC);
        this.expiredDateTime = issuedDateTime.plusHours(12);
        // Expire in 12 hours
    }
}
