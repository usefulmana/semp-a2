package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UpdateInfoRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;
}
