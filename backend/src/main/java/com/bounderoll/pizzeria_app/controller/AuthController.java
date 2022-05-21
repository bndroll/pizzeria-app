package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.dto.LoginDto;
import com.bounderoll.pizzeria_app.dto.RegisterDto;
import com.bounderoll.pizzeria_app.response.MessageResponse;
import com.bounderoll.pizzeria_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserService userService;

    @Autowired
    public AuthController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
        if (userService.existsByUsername(dto.getUsername()) || userService.existsByEmail(dto.getEmail()))
            return ResponseEntity.status(404).body(new MessageResponse("User already exist"));

        return ResponseEntity.ok(userService.create(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        return ResponseEntity.ok(userService.login(dto));
    }

    @GetMapping("/activate/{code}")
    public boolean activate(@PathVariable String code) {
        return userService.activateUser(code);
    }
}
