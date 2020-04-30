package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PasswordChangeRequest {

    @NotBlank
    private String oldpassword;

    @NotBlank
    private String newpassword;
}
