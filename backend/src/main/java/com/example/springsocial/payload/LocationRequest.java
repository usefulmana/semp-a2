package com.example.springsocial.payload;

import lombok.Data;


@Data
public class LocationRequest {
    private String name;

    private String x;

    private String y;

    private String description;

    private int minTime;
}
