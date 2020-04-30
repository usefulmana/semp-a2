package com.example.springsocial.repository;

import com.example.springsocial.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, String> {
    Page<Tour> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
