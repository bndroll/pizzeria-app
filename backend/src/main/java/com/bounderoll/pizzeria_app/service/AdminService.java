package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.dto.CreatePizzaWrapperDto;
import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.repository.RoleRepository;
import com.bounderoll.pizzeria_app.response.PizzaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AdminService {
    private final PizzaService pizzaService;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminService(final PizzaService pizzaService, final RoleRepository roleRepository) {
        this.pizzaService = pizzaService;
        this.roleRepository = roleRepository;
    }

    public void createPizza(CreatePizzaWrapperDto dto) {
        this.pizzaService.create(dto);
    }

    public boolean isPizzasEmpty(String title) {
        return this.pizzaService.findByTitle(title).size() == 0;
    }

    public MultipartFile createPizzaImage(String filename) throws IOException {
        Path path = Paths.get("backend", "data").toAbsolutePath().resolve(filename + ".png");
        Resource resource = new UrlResource(path.toUri());
        return new MockMultipartFile(filename + ".png", resource.getFilename(), "image/x-png", Files.readAllBytes(path));
    }

    public void createRole(Role role) {
        if (roleRepository.findByName(role.getName()).isEmpty()) {
            this.roleRepository.save(role);
        }
    }
}
