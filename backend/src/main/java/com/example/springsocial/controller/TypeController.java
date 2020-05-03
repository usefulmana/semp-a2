package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Tour;
import com.example.springsocial.model.Type;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.TypeRequest;
import com.example.springsocial.repository.TourRepository;
import com.example.springsocial.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/types")
public class TypeController {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TourRepository tourRepository;

    @GetMapping("")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<?> getAllTypes(Pageable pageable){
        return new ResponseEntity<>(new ApiResponse(true, "Query Results",
                typeRepository.findAll(pageable)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<?> getAType(@PathVariable(name = "id") String id){
        Type type = typeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Type", "id", id));
        return new ResponseEntity<>(new ApiResponse(true, "Type found", type), HttpStatus.OK);
    }

    @PostMapping("")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> createAType(@Valid @RequestBody TypeRequest request){
        Type type = new Type();
        type.setName(request.getName());
        return new ResponseEntity<>(new ApiResponse(true, "Type Created!", typeRepository.save(type))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> deleteAType(@PathVariable(name = "id") String id){
        Type type = typeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Type", "id", id));
        List<Tour> tours = tourRepository.findAll();

        for (Tour tour: tours){
            if (tour.getTypes().contains(type)){
                tour.getTypes().removeAll(Collections.singleton(type));
                tourRepository.save(tour);
            }
        }

        typeRepository.delete(type);
        return new ResponseEntity<>(new ApiResponse(true, "Type Deleted")
                , HttpStatus.OK);
    }


    // TODO Edit Functionality In Sprint II
    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> updateAType(@PathVariable(name = "id") String id){
        return null;
    }
}
