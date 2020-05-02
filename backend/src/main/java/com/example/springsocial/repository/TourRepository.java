package com.example.springsocial.repository;

import com.example.springsocial.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TourRepository extends JpaRepository<Tour, String> {
    Page<Tour> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query(value = "SELECT t from Tour t where " +
            "(:name is null or t.name like %:name%) and " +
            "(:time_lower is null or t.minTime >= :time_lower ) and" +
            "(:time_upper is null or t.minTime <= :time_upper )"
            )
    Page<Tour> findBy(@Param("name") String name,
                      @Param("time_lower") int time_lower,
                      @Param("time_upper") int time_upper,
                      Pageable pageable);
}
