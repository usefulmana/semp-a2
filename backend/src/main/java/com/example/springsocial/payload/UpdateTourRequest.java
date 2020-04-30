package com.example.springsocial.payload;

import com.example.springsocial.model.Location;
import com.example.springsocial.model.Type;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;


@Data
public class UpdateTourRequest {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    private String thumbnail;

    private String description;

    private List<Location> locations;

    private Set<Type> types;
}
