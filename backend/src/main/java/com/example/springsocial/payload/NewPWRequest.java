package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class NewPWRequest {
    @NotBlank
    private String token;

    @NotBlank
    private String password;
}
