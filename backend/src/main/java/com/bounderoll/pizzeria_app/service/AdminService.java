package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.dto.CreatePizzaWrapperDto;
import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void createRole(Role role) {
        if (roleRepository.findByName(role.getName()).isEmpty()) {
            this.roleRepository.save(role);
        }
    }
}
