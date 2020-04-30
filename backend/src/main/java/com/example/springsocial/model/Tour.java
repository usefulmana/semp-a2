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
@Table(name = "tours")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Tour {

    @Id
    @Column(name = "id", updatable = false)
    private String id = GeneralUtils.encodeUUIDToBase64();

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "tour_locations",
//            joinColumns = @JoinColumn(name = "tour_id"),
//            inverseJoinColumns = @JoinColumn(name = "location_id"))
    private List<Location> locations = new ArrayList<>();

//    @OneToMany
//    private Set<Location> locations = new HashSet<>();

    @ManyToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "tour_types",
//            joinColumns = @JoinColumn(name = "tour_id"),
//            inverseJoinColumns = @JoinColumn(name = "type_id"))
    private Set<Type> types = new HashSet<>();

//    @OneToMany
//    private Set<Type> types = new HashSet<>();

    // TODO Find Default Thumbnail
    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "description")
    private String description;

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

    @Column(name = "min_time_in_sec")
    private int minTime=0;

    @Column(name = "last_updated_by")
    @LastModifiedBy
    private String lastUpdatedBy;
}
