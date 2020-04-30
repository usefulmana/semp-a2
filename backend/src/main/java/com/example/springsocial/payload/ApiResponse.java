package com.example.springsocial.payload;

import lombok.Data;

@Data
public class ApiResponse {
    private boolean success;
    private String message;
    private Object payload = null;

    public ApiResponse(boolean success, String message, Object object) {
        this.success = success;
        this.message = message;
        this.payload = object;
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
