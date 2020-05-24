package com.example.springsocial.controller;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.springsocial.model.Location;
import com.example.springsocial.model.User;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.repository.LocationRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/photo")
public class PhotoController {

    @Autowired
    private Environment env;

    @Getter
    private int index = 49;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/loc")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> uploadLocationPhoto(@RequestParam(value = "file") MultipartFile file,
                                                 @RequestParam(value = "l_id") String id){


            Optional<Location> location = locationRepository.findById(id);

            if (location.isPresent()){
                Location loc = location.get();


                Cloudinary cloudinary = getCloudinaryConfig();

                try {
                    Map<String, String> res = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                    String photoUrl = transformPhotoUrl(res.get("secure_url"), "h_540,w_960/");
                    loc.setPic(photoUrl);
                    locationRepository.save(loc);
                    return new ResponseEntity<>(new ApiResponse(true, "Success"),  HttpStatus.OK);
                }
                catch (IOException e){
                    System.out.println(e.getMessage());
                }

            }
            return new ResponseEntity<>(new ApiResponse(false, "Location Not Found"),  HttpStatus.BAD_REQUEST);


    }

    @PostMapping("/profile")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<?> uploadProfilePhoto(@RequestParam("file") MultipartFile file,
                                                @CurrentUser UserPrincipal userPrincipal){
        Optional<User> temp = userRepository.findById(userPrincipal.getId());

        if (temp.isPresent()){

            Cloudinary cloudinary = getCloudinaryConfig();

            User user = temp.get();
            try {
                Map<String, String> res = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

                String photoUrl = transformPhotoUrl(res.get("secure_url"), "h_300,w_300/");

                user.setImageUrl(photoUrl);

                userRepository.save(user);
                return new ResponseEntity<>(new ApiResponse(true, "Success"),  HttpStatus.OK);
            }
            catch (IOException e){
                System.out.println(e.getMessage());
            }
        }

        return new ResponseEntity<>(new ApiResponse(false, "User Not Found"),  HttpStatus.BAD_REQUEST);
    }

    private Cloudinary getCloudinaryConfig(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", env.getProperty("cloudinary.cloud_name"));
        config.put("api_key", env.getProperty("cloudinary.api_key"));
        config.put("api_secret",env.getProperty("cloudinary.api_secret"));
        return new Cloudinary(config);
    }

    private String transformPhotoUrl(String target, String toBeInserted){
        return target.substring(0, this.getIndex() + 1)
                + toBeInserted + target.substring(this.getIndex() + 1);
    }
}
