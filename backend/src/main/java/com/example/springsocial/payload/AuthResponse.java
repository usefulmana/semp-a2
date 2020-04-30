package com.example.springsocial.payload;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Object object;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponse(String accessToken, Object object) {
        this.accessToken = accessToken;
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
