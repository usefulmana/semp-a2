package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TourRequest {
    @NotBlank
    private String name;

    private String desc;

}
