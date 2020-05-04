package com.example.springsocial.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
public class LocationUpdateRequest {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

//    private List<String> pics = new ArrayList<>();

    @NotBlank
    private String x;

    @NotBlank
    private String y;

    private int minTime;


}
