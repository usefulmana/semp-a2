package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Location;
import com.example.springsocial.model.Tour;
import com.example.springsocial.model.Type;
import com.example.springsocial.payload.*;
import com.example.springsocial.repository.LocationRepository;
import com.example.springsocial.repository.TourRepository;
import com.example.springsocial.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/tours")
public class TourController {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private TypeRepository typeRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllTours(Pageable pageable){
        return new ResponseEntity<>(new ApiResponse(true, "Query Results", tourRepository.findAll(pageable)),
                HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getATour(@PathVariable(name = "id")String id){
        Tour tour = tourRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Tour", "id", id)
        );
        return new ResponseEntity<>(new ApiResponse(true, "Tour found", tour), HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchForTours(@PathVariable(name = "name") String name,
                                            Pageable pageable){
        Page<Tour> tours = tourRepository.findByNameContainingIgnoreCase(name, pageable);
        return new ResponseEntity<>(new ApiResponse(true, "Query Results", tours), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createATour(@Valid @RequestBody TourRequest request){
        Tour tour = new Tour();
        tour.setName(request.getName());
        tour.setDescription(request.getDesc());
        return new ResponseEntity<>(new ApiResponse(true, "Tour Created!", tourRepository.save(tour))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteATour(@PathVariable(name = "id")String id){
        Tour tour = tourRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Tour", "id", id)
        );
        tourRepository.delete(tour);
        return new ResponseEntity<>(new ApiResponse(true, "Tour Deleted"), HttpStatus.OK);
    }
    

    @PatchMapping("/loc")
    public ResponseEntity<?> addOrRemoveALocToATour(@Valid @RequestBody TourLocationRequest request,
                                                    @RequestParam(name = "method") String method){
        Tour tour = tourRepository.findById(request.getTour_id()).orElseThrow(
                () -> new ResourceNotFoundException("Tour", "id", request.getTour_id())
        );
        Location location = locationRepository.findById(request.getLoc_id()).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", request.getLoc_id()));

        if (method.equalsIgnoreCase("add")){
//            if (tour.getLocations().contains(location)){
//                return new ResponseEntity<>(new ApiResponse(false, "Location already added to tour!" )
//                        , HttpStatus.BAD_REQUEST);
//            }
            tour.getLocations().add(location);
            tour.setMinTime(tour.getMinTime() + location.getMinTime());
            tourRepository.save(tour);
            return new ResponseEntity<>(new ApiResponse(true, "Location added to tour!" )
                    , HttpStatus.OK);
        }
        else if (method.equalsIgnoreCase("remove")){
            if (!tour.getLocations().contains(location)){
                return new ResponseEntity<>(new ApiResponse(false, "Location is not in tour!" )
                        , HttpStatus.BAD_REQUEST);
            }
            tour.getLocations().remove(location);
            tour.setMinTime(tour.getMinTime() - location.getMinTime());
            tourRepository.save(tour);
            return new ResponseEntity<>(new ApiResponse(true, "Location removed from tour!")
                    , HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(true, "Invalid Method"), HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/type")
    public ResponseEntity<?> addOrRemoveATypeToATour(@Valid @RequestBody TourTypeRequest request,
                                                    @RequestParam(name = "method") String method){
        Tour tour = tourRepository.findById(request.getTour_id()).orElseThrow(
                () -> new ResourceNotFoundException("Tour", "id", request.getTour_id())
        );
        Type type = typeRepository.findById(request.getType_id()).orElseThrow(
                () -> new ResourceNotFoundException("Location", "id", request.getType_id()));

        if (method.equalsIgnoreCase("add")){
//            if (tour.getTypes().contains(type)){
//                return new ResponseEntity<>(new ApiResponse(false, "Type already added to tour!" )
//                        , HttpStatus.BAD_REQUEST);
//            }
            tour.getTypes().add(type);
            tourRepository.save(tour);
            return new ResponseEntity<>(new ApiResponse(true, "Type added to tour!" )
                    , HttpStatus.OK);
        }
        else if (method.equalsIgnoreCase("remove")){
            if (!tour.getTypes().contains(type)){
                return new ResponseEntity<>(new ApiResponse(false, "Type is not assigned to this tour!" )
                        , HttpStatus.BAD_REQUEST);
            }
            tour.getTypes().remove(type);
            tourRepository.save(tour);
            return new ResponseEntity<>(new ApiResponse(true, "Type removed from tour!")
                    , HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Invalid Method"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTour(@Valid @RequestBody UpdateTourRequest request){
        Tour tour = tourRepository.findById(request.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Tour", "id", request.getId())
        );

        tour.setDescription(request.getDescription());
        tour.setName(request.getName());
        tour.setLocations(request.getLocations());
        tour.setTypes(request.getTypes());
        tour.setThumbnail(request.getThumbnail());

        return new ResponseEntity<>(new ApiResponse(true, "Updated", tourRepository.save(tour)), HttpStatus.OK);
    }
}
