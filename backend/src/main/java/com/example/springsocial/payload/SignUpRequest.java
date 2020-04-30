package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    private String imageUrl;

    @NotBlank
    private String password;

    @NotBlank
    private String role;
}
