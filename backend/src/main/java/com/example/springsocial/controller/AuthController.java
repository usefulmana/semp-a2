package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.*;
import com.example.springsocial.payload.*;
import com.example.springsocial.repository.LoggedUserRepo;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.service.EmailSenderService;
import com.example.springsocial.util.GeneralUtils;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import javax.mail.MessagingException;
import javax.validation.Valid;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private LoggedUserRepo loggedUserRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Value("${spring.mail.username}")
    @Getter
    private String hostEmail;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws IOException, MessagingException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<User> user = userRepository.findByUserName(loginRequest.getUsername());

        Optional<LoggedUser> optionalLoggedUser = loggedUserRepo.findByUserName(loginRequest.getUsername());

        String token = tokenProvider.createToken(authentication);
        if (optionalLoggedUser.isPresent()){
            LoggedUser loggedUser = optionalLoggedUser.get();
            loggedUser.setLastLoggedIn(LocalDateTime.now());
            loggedUserRepo.save(loggedUser);
        }
        else {
            LoggedUser loggedUser = new LoggedUser();
            loggedUser.setUserName(loginRequest.getUsername());
            loggedUser.setUserEmail(user.get().getEmail());
            loggedUserRepo.save(loggedUser);
        }

        if (user.isPresent()){
            sendLoginNotifEmail(user.get());
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

        user.setImageUrl(signUpRequest.getImageUrl());

        user.setProvider(AuthProvider.local);

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

    @GetMapping("/loggedIn")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> getAllLoggedInUser(){
        List<LoggedUser> users = loggedUserRepo.findAll();
        List<LoggedUser> results = new ArrayList<>();

        for (LoggedUser user: users){
            if (user.getLastLoggedIn().getDayOfYear() == LocalDateTime.now().getDayOfYear()){
                results.add(user);
            }
            else {
                loggedUserRepo.delete(user);
            }
        }

        return new ResponseEntity<>(new ApiResponse(true,"Success", results), HttpStatus.OK);
    }

    private void sendLoginNotifEmail(User user) throws IOException, MessagingException {
        Email mail = new Email();
        mail.setFrom(getHostEmail());
        mail.setTo(user.getEmail());
        mail.setSubject("Someone just logged in to M with your account");

        Map<String, Object> model = new HashMap<>();
        model.put("verification_url", LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yy HH:mm:ss")));
        mail.setModel(model);
        emailSenderService.sendSimpleMessage(mail, "login-notif");
    }
}
