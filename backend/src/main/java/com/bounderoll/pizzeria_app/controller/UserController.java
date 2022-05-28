package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.response.UserResponse;
import com.bounderoll.pizzeria_app.service.IdentityService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    private final IdentityService identityService;

    public UserController(final IdentityService identityService) {
        this.identityService = identityService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public UserResponse findMe() {
        return identityService.findMe();
    }
}
