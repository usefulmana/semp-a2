package com.example.springsocial.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Location;
import com.example.springsocial.model.Tour;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.LocationRequest;
import com.example.springsocial.payload.LocationUpdateRequest;
import com.example.springsocial.repository.LocationRepository;
import com.example.springsocial.repository.TourRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/loc")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Getter
    private int index = 49;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private Environment env;

    @GetMapping("")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
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
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<?> getALocation(@PathVariable(name = "id") String id){
        Location location = locationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", id));
        return new ResponseEntity<>(new ApiResponse(true, "Location Found!", location), HttpStatus.OK);
    }

    @PostMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> createALocation(@Valid @RequestBody LocationRequest request){
        Location location = new Location();
        location.setName(request.getName());
        location.setX(Double.parseDouble(request.getX()));
        location.setY(Double.parseDouble(request.getY()));
        location.setDescription(request.getDescription());
        location.setMinTime(request.getMinTime());

        Location temp = locationRepository.save(location);
//        if (!Objects.isNull(file)){
//            Map<String, String> config = new HashMap<>();
//            config.put("cloud_name", env.getProperty("cloudinary.cloud_name"));
//            config.put("api_key", env.getProperty("cloudinary.api_key"));
//            config.put("api_secret",env.getProperty("cloudinary.api_secret"));
//            Cloudinary cloudinary = new Cloudinary(config);
//            try {
//                Map<String, String> res = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//                String photoUrl = transformPhotoUrl(res.get("secure_url"), "h_540,w_960/");
//                temp.setPic(photoUrl);
//                return new ResponseEntity<>(new ApiResponse(true, "Success", locationRepository.save(temp)),  HttpStatus.OK);
//            }
//            catch (IOException e){
//                System.out.println(e.getMessage());
//            }
//        }

        return new ResponseEntity<>(new ApiResponse(true, "Location Created!", temp)
                , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
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


    @PutMapping("")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> updateALocation(@Valid @RequestBody LocationUpdateRequest request){
        Location location = locationRepository.findById(request.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", request.getId()));
        location.setMinTime(request.getMinTime());
        location.setDescription(request.getDescription());
        location.setName(request.getName());
        location.setX(Double.parseDouble(request.getX()));
        location.setY(Double.parseDouble(request.getY()));
        return new ResponseEntity<>(new ApiResponse(true, "Updated", locationRepository.save(location))
                , HttpStatus.OK);
    }

    private String transformPhotoUrl(String target, String toBeInserted){
        return target.substring(0, this.getIndex() + 1)
                + toBeInserted + target.substring(this.getIndex() + 1);
    }
}
