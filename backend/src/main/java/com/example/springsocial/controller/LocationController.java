package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Location;
import com.example.springsocial.model.Tour;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.LocationRequest;
import com.example.springsocial.repository.LocationRepository;
import com.example.springsocial.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/loc")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private TourRepository tourRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllLocations(Pageable pageable){
//        if (sort.trim().equalsIgnoreCase("desc")){
//            return new ResponseEntity<>(new ApiResponse(true, "Query Results",
//                    locationRepository.findAllByOrderByCreatedAtDesc(pageable)), HttpStatus.OK);
//        }
//        else if (sort.trim().equalsIgnoreCase("asc")) {
//            return new ResponseEntity<>(new ApiResponse(true, "Query Results",
//                    locationRepository.findAllByOrderByCreatedAtAsc(pageable)), HttpStatus.OK);
//        }
        return new ResponseEntity<>(new ApiResponse(true, "Query Results", locationRepository.findAll(pageable)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getALocation(@PathVariable(name = "id") String id){
        Location location = locationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", id));
        return new ResponseEntity<>(new ApiResponse(true, "Location Created!", location), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createALocation(@Valid @RequestBody LocationRequest request){
        Location location = new Location();
        location.setName(request.getName());
        location.setX(Double.parseDouble(request.getX()));
        location.setY(Double.parseDouble(request.getY()));
        location.setDescription(request.getDescription());
        location.setMinTime(request.getMinTime());

        return new ResponseEntity<>(new ApiResponse(true, "Location found", locationRepository.save(location))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteALocation(@PathVariable(name = "id") String id){
        Location location = locationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", id));
        List<Tour> tours = tourRepository.findAll();

        for (Tour tour: tours){
            if (tour.getLocations().contains(location)){
                tour.getLocations().removeAll(Collections.singleton(location));
                tourRepository.save(tour);
            }
        }

        locationRepository.delete(location);
        return new ResponseEntity<>(new ApiResponse(true, "Location Deleted")
                , HttpStatus.OK);
    }


    // TODO Edit Functionality In Sprint II
    @PutMapping("/{id}")
    public ResponseEntity<?> updateALocation(@PathVariable(name = "id") String id){
        return null;
    }
}
