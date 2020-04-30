package com.example.springsocial.repository;

import com.example.springsocial.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, String> {
    Page<Location> findAllByOrderByCreatedAtDesc(Pageable page);
    Page<Location> findAllByOrderByCreatedAtAsc(Pageable page);
}
