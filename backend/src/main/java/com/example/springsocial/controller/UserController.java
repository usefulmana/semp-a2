package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.*;
import com.example.springsocial.payload.*;
import com.example.springsocial.repository.TokenRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import com.example.springsocial.service.EmailSenderService;
import com.example.springsocial.util.GeneralUtils;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private TokenRepository tokenRepository;

    @Value("${spring.mail.username}")
    @Getter
    private String hostEmail;

    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping("/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PutMapping("/me/update")
    public User updateUserInfo(@CurrentUser UserPrincipal userPrincipal,
                                            @Valid @RequestBody UpdateInfoRequest request){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        user.setEmail(request.getEmail());
        user.setName(request.getName());
        return userRepository.save(user);
    }

    @PutMapping("/update")
    public User adminUpdateUserInfo(@Valid @RequestBody AdminUpdateUserInfo request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        user.setEmail(request.getEmail());
        user.setName(request.getName());

        if (request.getRole().equalsIgnoreCase("ROLE_USER")){
            user.setRole(Role.ROLE_USER);
        }
        if (request.getRole().equalsIgnoreCase("ROLE_ADMIN")){
            user.setRole(Role.ROLE_ADMIN);
        }

        return userRepository.save(user);
    }

    @PostMapping("/pw/to")
    public ResponseEntity<?> changePassword(@CurrentUser UserPrincipal userPrincipal,
                                            @Valid @RequestBody PasswordChangeRequest request){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        if (encoder.matches(request.getOldpassword(), user.getPassword())){
            if (GeneralUtils.checkPWStrength(request.getNewpassword())){
                user.setPassword(encoder.encode(request.getNewpassword()));
                userRepository.save(user);
                return new ResponseEntity<>(new ApiResponse(true, "Changed"), HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<>(new ApiResponse(false, "Weak Password"), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new ApiResponse(false, "Passwords do not match!"), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@Valid @RequestBody TokenRequest request) throws IOException, MessagingException {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));
        ConfirmationToken token = new ConfirmationToken(user);

        if (request.getType().equalsIgnoreCase("pw_recovery")){
            token.setType(Token.PW_RECOVERY);
        }
        else if (request.getType().equalsIgnoreCase("confirmation")){
            token.setType(Token.CONFIRMATION);
        }
        else {
            return new ResponseEntity<>(new ApiResponse(false, "No such token type exists!"), HttpStatus.BAD_REQUEST);
        }
        tokenRepository.save(token);

        sendEmailWithToken(user, token);

        return new ResponseEntity<>(new ApiResponse(true, "Email Sent!"), HttpStatus.OK);
    }

    @PostMapping("/recover")
    public ResponseEntity<?> recoverPassword(@Valid @RequestBody NewPWRequest request){
        ConfirmationToken tempToken = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("User", "token", request.getToken()));

//        System.out.println(tempToken.getType());
//        if (!tempToken.getType().equals("PW_RECOVERY")){
//            return new ResponseEntity<>(new ApiResponse(false, "Invalid token for this action!"), HttpStatus.BAD_REQUEST);
//        }
        System.out.println("Local: " + LocalDateTime.now());
        System.out.println("Expired: "+  tempToken.getExpiredDateTime());
        if (tempToken.getConfirmedDateTime() != null){
            return new ResponseEntity<>(new ApiResponse(false, "Token has already been used")
                    , HttpStatus.BAD_REQUEST);
        }
        else if (LocalDateTime.now().isBefore(tempToken.getExpiredDateTime())){
            User user = userRepository.findById(tempToken.getUser().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", tempToken.getUser().getId()));
            if (GeneralUtils.checkPWStrength(request.getPassword())){
                user.setPassword(encoder.encode(request.getPassword()));
                userRepository.save(user);
                tempToken.setConfirmedDateTime(LocalDateTime.now());
                tokenRepository.save(tempToken);
                return new ResponseEntity<>(new ApiResponse(true, "Success! Please Log In With Your New Password")
                        , HttpStatus.OK);
            }
            return new ResponseEntity<>(new ApiResponse(false, "Weak Password")
                    , HttpStatus.BAD_REQUEST);
        }

        else {
            return new ResponseEntity<>(new ApiResponse(false, "Token Expired")
                    , HttpStatus.BAD_REQUEST);
        }

    }

    private void sendEmailWithToken(User user, ConfirmationToken token) throws IOException, MessagingException {
        Email mail = new Email();
        System.out.println(getHostEmail());
        mail.setFrom(getHostEmail());
        mail.setTo(user.getEmail());
        if (token.getType().equals(Token.PW_RECOVERY)){
            mail.setSubject("Password Recovery");
        }
        else{
            mail.setSubject("Complete Your Registration");
        }

        Map<String, Object> model = new HashMap<>();
        model.put("verification_url", String.format("http://localhost:3000/recover/%s", token.getToken()));
        mail.setModel(model);
        // TODO Remove This The Comment Bracket in Prod
        // emailSenderService.sendSimpleMessage(mail);
    }

    private String validateToken(String token){
        return "";
    }
}
