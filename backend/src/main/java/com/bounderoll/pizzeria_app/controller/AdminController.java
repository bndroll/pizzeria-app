package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.response.MostPopularPizzaResponse;
import com.bounderoll.pizzeria_app.service.PizzaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final PizzaService pizzaService;

    public AdminController(final PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    @GetMapping("/most-popular")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MostPopularPizzaResponse>> findMostPopularPizzas() {
        return ResponseEntity.ok(pizzaService.findMostPopularPizzas());
    }

    @GetMapping("/most-ordered")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MostPopularPizzaResponse>> findMostOrderedPizzas() {
        return ResponseEntity.ok(pizzaService.findMostOrderedPizzas());
    }
}
