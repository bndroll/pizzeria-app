package com.bounderoll.pizzeria_app.controller;

import com.bounderoll.pizzeria_app.dto.CreatePizzaWrapperDto;
import com.bounderoll.pizzeria_app.dto.UpdatePizzaDto;
import com.bounderoll.pizzeria_app.response.CategoryItemResponse;
import com.bounderoll.pizzeria_app.response.MessageResponse;
import com.bounderoll.pizzeria_app.response.PizzaResponse;
import com.bounderoll.pizzeria_app.service.PizzaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/pizza")
@CrossOrigin(origins = "*")
public class PizzaController {
    private final PizzaService pizzaService;

    public PizzaController(final PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@ModelAttribute CreatePizzaWrapperDto dto) {
        if (pizzaService.findByTitleAndTypeAndSize(dto.getTitle(), dto.getType(), dto.getSize()).size() != 0)
            return ResponseEntity.status(400).body(new MessageResponse("Pizza already exist"));

        return ResponseEntity.status(201).body(pizzaService.create(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<PizzaResponse>> findAll() {
        return ResponseEntity.ok(pizzaService.findAll());
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        PizzaResponse pizza = pizzaService.findById(id);

        if (pizza == null)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza);
    }

    @GetMapping("/find")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findByTitle(@RequestParam String title) {
        List<PizzaResponse> pizzas = pizzaService.findByTitle(title);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasRole('USER') or hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<?> findPizzaCategories() {
        List<CategoryItemResponse> categories = pizzaService.findPizzaCategories();

        if (categories.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("No categories was found"));

        return ResponseEntity.ok(categories);
    }

    @PatchMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody UpdatePizzaDto dto) {

        PizzaResponse pizza = pizzaService.update(id, dto);

        if (pizza == null)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza);
    }

    @PatchMapping("{id}/photo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        PizzaResponse pizza = pizzaService.updatePhotoById(id, file);

        if (pizza == null)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza);
    }

    @PatchMapping("/group-photo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePizzaGroupPhotoByTitle(
            @RequestParam String title,
            @RequestParam("file") MultipartFile file) {

        List<PizzaResponse> pizzas = pizzaService.updatePizzaGroupPhotoByTitle(title, file);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        PizzaResponse pizza = pizzaService.deleteById(id);

        if (pizza == null)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza with this id not found"));

        return ResponseEntity.ok(pizza);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteByTitle(@RequestParam String title) {
        List<PizzaResponse> pizzas = pizzaService.deleteByTitle(title);

        if (pizzas.size() == 0)
            return ResponseEntity.status(404).body(new MessageResponse("Pizza(s) with this title not found"));

        return ResponseEntity.ok(pizzas);
    }
}
