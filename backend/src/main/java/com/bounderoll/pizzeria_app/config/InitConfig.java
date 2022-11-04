package com.bounderoll.pizzeria_app.config;

import com.bounderoll.pizzeria_app.dto.RegisterDto;
import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.model.User;
import com.bounderoll.pizzeria_app.model.enums.ERole;
import com.bounderoll.pizzeria_app.response.UserResponse;
import com.bounderoll.pizzeria_app.service.AdminService;
import com.bounderoll.pizzeria_app.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class InitConfig {
    @Bean
    CommandLineRunner run(AdminService adminService, UserService userService) {
        return args -> {
            adminService.createRole(new Role(null, ERole.ROLE_USER));
            adminService.createRole(new Role(null, ERole.ROLE_EMPLOYEE));
            adminService.createRole(new Role(null, ERole.ROLE_ADMIN));

            Set<String> rolesSet = new HashSet<>();
            rolesSet.add("admin");
            UserResponse createdUser = userService.create(new RegisterDto("admin", "test@gmail.com", rolesSet, "testpassword"));
            User user = userService.findById(createdUser.getId()).orElseThrow();
            userService.activateUser(user.getActivationCode());
        };
    }
}
