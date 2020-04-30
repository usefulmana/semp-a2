package com.example.springsocial.model;

import com.example.springsocial.util.GeneralUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "types")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Type {

    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "name", nullable = false)
    private String name;

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
}
