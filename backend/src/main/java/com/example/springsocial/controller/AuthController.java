package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.AuthProvider;
import com.example.springsocial.model.Role;
import com.example.springsocial.model.User;
import com.example.springsocial.payload.*;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.util.GeneralUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<User> user = userRepository.findByUserName(loginRequest.getUsername());
        String token = tokenProvider.createToken(authentication);
        if (user.isPresent()){
            return ResponseEntity.ok(new AuthResponse(token, user.get()));
        }
        return new ResponseEntity<>(new ApiResponse(false, "No such User exists"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/{id}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> getUserById(@PathVariable(name = "id")String id){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return new ResponseEntity<>(new ApiResponse(true, "Success", user), HttpStatus.OK);
    }

    @GetMapping("/all")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> getAllUsers(Pageable pageable){
        return new ResponseEntity<>(new ApiResponse(true, "Query Results", userRepository.findAll(pageable)), HttpStatus.OK);
    }

    @PostMapping("/signup")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }
        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());

        // TODO: Change Default Image URL
        user.setImageUrl(signUpRequest.getImageUrl());

        user.setProvider(AuthProvider.local);

        // Comment out the below line when password checking is enabled
        // user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        if (signUpRequest.getRole().equalsIgnoreCase("admin")){
            user.setUserName("a" + GeneralUtils.generateUsername());
            user.setRole(Role.ROLE_ADMIN);
        }
        else if (signUpRequest.getRole().equalsIgnoreCase("user")){
            user.setUserName("u" + GeneralUtils.generateUsername());
            user.setRole(Role.ROLE_USER);
        }

        // Checking Password's Strength
        if (GeneralUtils.checkPWStrength(signUpRequest.getPassword())){
            user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "Weak Password"), HttpStatus.BAD_REQUEST);
        }

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));
    }

    @PutMapping("/ban")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> banUser(@Valid @RequestBody BanRequest request){
        User user = userRepository.findByUserName(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", request.getUsername()));

        if (user.getIsActive()){
            user.setIsActive(false);
            userRepository.save(user);
            return new ResponseEntity<>(new ApiResponse(true, "User " + request.getUsername() + " is banned")
                    , HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "User " + request.getUsername() + " is already banned")
                , HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/unban")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> unbanUser(@Valid @RequestBody BanRequest request){
        User user = userRepository.findByUserName(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", request.getUsername()));

        if (!user.getIsActive()){
            user.setIsActive(true);
            userRepository.save(user);
            return new ResponseEntity<>(new ApiResponse(true, "User " + request.getUsername() + " is unbanned")
                    , HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "User " + request.getUsername() + " is not banned")
                , HttpStatus.BAD_REQUEST);
    }
}
