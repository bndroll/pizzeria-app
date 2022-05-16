package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private Set<String> roles;
    private String password;
}
