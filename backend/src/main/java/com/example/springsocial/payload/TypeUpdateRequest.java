package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TypeUpdateRequest {

    @NotBlank
    private String id;

    @NotBlank
    private String name;
}
