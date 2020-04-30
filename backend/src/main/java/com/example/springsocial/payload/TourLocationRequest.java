package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TourLocationRequest {

    @NotBlank
    private String tour_id;

    @NotBlank
    private String loc_id;
}
