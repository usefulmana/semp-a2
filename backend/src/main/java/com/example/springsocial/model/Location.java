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
import java.util.*;

@Entity
@Table(name = "locations")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Location {
    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "name", nullable = false)
    private String name;

    // TODO Find Ways To Upload Images
    @Column(name = "pics")
    @ElementCollection
    private List<String> pics = new ArrayList<>();

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "min_time_in_seconds", nullable = false)
    private int minTime = 0;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    @CreatedBy
    private String createdBy;

    @Column(name = "last_updated")
    @LastModifiedDate
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime lastUpdated;

    @Column(name = "last_updated_by")
    @LastModifiedBy
    private String lastUpdatedBy;
}
