package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.dto.CreatePizzaDto;
import com.bounderoll.pizzeria_app.dto.UpdatePizzaDto;
import com.bounderoll.pizzeria_app.model.Pizza;
import com.bounderoll.pizzeria_app.response.CategoryResponseItem;
import com.bounderoll.pizzeria_app.response.MessageResponse;
import com.bounderoll.pizzeria_app.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pizza")
@CrossOrigin(origins = "*")
public class PizzaController {
    @Autowired
    PizzaService pizzaService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@RequestBody CreatePizzaDto dto) {
        if (pizzaService.findByTitleAndTypeAndSize(dto).size() != 0)
            return ResponseEntity.badRequest().body(new MessageResponse("Pizza already exist"));

        return ResponseEntity.ok(pizzaService.create(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<Pizza>> findAll() {
        return ResponseEntity.ok(pizzaService.findAll());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Pizza> pizza = pizzaService.findById(id);

        if (pizza.isEmpty())
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza.get());
    }

    @GetMapping("/find")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findByTitle(@RequestParam String title) {
        List<Pizza> pizzas = pizzaService.findByTitle(title);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findPizzaCategories() {
        List<CategoryResponseItem> categories = pizzaService.findPizzaCategories();

        if (categories.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("No categories was found"));

        return ResponseEntity.ok(categories);
    }

    @PatchMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody UpdatePizzaDto dto) {

        Optional<Pizza> pizza = pizzaService.update(id, dto);

        if (pizza.isEmpty())
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza.get());
    }

    @PatchMapping("{id}/photo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        Optional<Pizza> pizza = pizzaService.updatePhotoById(id, file);

        if (pizza.isEmpty())
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza.get());
    }

    @PatchMapping("{title}/group-photo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePizzaGroupPhotoByTitle(
            @PathVariable String title,
            @RequestParam("file") MultipartFile file) {

        List<Pizza> pizzas = pizzaService.updatePizzaGroupPhotoByTitle(title, file);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Pizza> pizza = pizzaService.deleteById(id);

        if (pizza.isEmpty())
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza.get());
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteByTitle(@RequestParam String title) {
        List<Pizza> pizzas = pizzaService.deleteByTitle(title);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }
}
