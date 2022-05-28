package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.dto.CratePizzaOrderDto;
import com.bounderoll.pizzeria_app.response.PizzaOrderResponse;
import com.bounderoll.pizzeria_app.service.PizzaOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pizza-order")
@CrossOrigin(origins = "*")
public class PizzaOrderController {
    private final PizzaOrderService pizzaOrderService;

    public PizzaOrderController(final PizzaOrderService pizzaOrderService) {
        this.pizzaOrderService = pizzaOrderService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<PizzaOrderResponse> create(@RequestBody CratePizzaOrderDto dto) {
        return ResponseEntity.ok(pizzaOrderService.create(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<PizzaOrderResponse>> findAll() {
        return ResponseEntity.ok(pizzaOrderService.findAll());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pizzaOrderService.findById(id));
    }
}
