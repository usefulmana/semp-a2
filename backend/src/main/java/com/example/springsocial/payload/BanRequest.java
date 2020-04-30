package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class BanRequest {

    @NotBlank
    private String username;
}
