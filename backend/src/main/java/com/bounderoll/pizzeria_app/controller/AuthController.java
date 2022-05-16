package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.dto.LoginRequest;
import com.bounderoll.pizzeria_app.response.MessageResponse;
import com.bounderoll.pizzeria_app.dto.RegisterRequest;
import com.bounderoll.pizzeria_app.repository.UserRepository;
import com.bounderoll.pizzeria_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest dto) {
        if (userRepository.existsByUsername(dto.getUsername()) || userRepository.existsByEmail(dto.getEmail()))
            return ResponseEntity.badRequest().body(new MessageResponse("User already exist"));

        return ResponseEntity.ok(userService.create(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {
        return ResponseEntity.ok(userService.login(dto));
    }

    @GetMapping("/activate/{code}")
    public boolean activate(@PathVariable String code) {
        return userService.activateUser(code);
    }
}