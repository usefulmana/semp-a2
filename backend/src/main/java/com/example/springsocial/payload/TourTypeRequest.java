package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TourTypeRequest {

    @NotBlank
    private String tour_id;

    @NotBlank
    private String type_id;
}
