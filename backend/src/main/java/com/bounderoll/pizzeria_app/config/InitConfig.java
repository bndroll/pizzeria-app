package com.bounderoll.pizzeria_app.config;

import com.bounderoll.pizzeria_app.dto.CreatePizzaWrapperDto;
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

            if (userService.findByUsername("admin").isEmpty()) {
                UserResponse createdUser = userService.create(new RegisterDto("admin", "test@gmail.com", rolesSet, "testpassword"));
                User user = userService.findById(createdUser.getId()).orElseThrow();
                userService.activateUser(user.getActivationCode());
            }

            if (adminService.isPizzasEmpty("Чизбергер пицца")) {
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "традиционное", 25, "овощная", 410, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "традиционное", 30, "овощная", 490, 6));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "традиционное", 40, "овощная", 560, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "тонкое", 25, "овощная", 400, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "тонкое", 30, "овощная", 460, 5));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_грибы"), "Ветчина и грибы", "тонкое", 40, "овощная", 520, 8));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "традиционное", 25, "мясная", 390, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "традиционное", 30, "мясная", 440, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "традиционное", 40, "мясная", 510, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "тонкое", 25, "мясная", 350, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "тонкое", 30, "мясная", 410, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("ветчина_и_сыр"), "Ветчина и сыр", "тонкое", 40, "мясная", 480, 9));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("гавайская"), "Гавайская", "традиционное", 25, "закрытая", 490, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("гавайская"), "Гавайская", "традиционное", 30, "закрытая", 530, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("гавайская"), "Гавайская", "традиционное", 40, "закрытая", 600, 8));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "традиционное", 25, "острая", 430, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "традиционное", 30, "острая", 510, 6));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "традиционное", 40, "острая", 580, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "тонкое", 25, "острая", 400, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "тонкое", 30, "острая", 470, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("диабло"), "Диабло", "тонкое", 40, "острая", 520, 8));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "традиционное", 25, "овощная", 450, 6));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "традиционное", 30, "овощная", 490, 5));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "традиционное", 40, "овощная", 530, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "тонкое", 25, "овощная", 420, 4));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "тонкое", 30, "овощная", 460, 6));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("овощи_гриль"), "Овощи гриль", "тонкое", 40, "овощная", 520, 7));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "традиционное", 25, "мясная", 510, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "традиционное", 30, "мясная", 580, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "традиционное", 40, "мясная", 620, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "тонкое", 25, "мясная", 490, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "тонкое", 30, "мясная", 540, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("пепперони_фреш"), "Пепперони фреш", "тонкое", 40, "мясная", 590, 9));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("сырный_цыпленок"), "Сырный цыпленок", "традиционное", 25, "мясная", 550, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("сырный_цыпленок"), "Сырный цыпленок", "традиционное", 30, "мясная", 600, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("сырный_цыпленок"), "Сырный цыпленок", "традиционное", 40, "мясная", 660, 9));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "традиционное", 25, "закрытая", 490, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "традиционное", 30, "закрытая", 550, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "традиционное", 40, "закрытая", 600, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "тонкое", 25, "закрытая", 450, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "тонкое", 30, "закрытая", 500, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_барбекю"), "Цыпленок барбекю", "тонкое", 40, "закрытая", 570, 10));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "традиционное", 25, "закрытая", 500, 8));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "традиционное", 30, "закрытая", 520, 10));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "традиционное", 40, "закрытая", 560, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "тонкое", 25, "закрытая", 490, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "тонкое", 30, "закрытая", 510, 9));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("цыпленок_ранч"), "Цыпленок ранч", "тонкое", 40, "закрытая", 530, 10));

                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("чизбургер_пицца"), "Чизбергер пицца", "традиционное", 25, "овощная", 470, 7));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("чизбургер_пицца"), "Чизбергер пицца", "традиционное", 30, "овощная", 520, 6));
                adminService.createPizza(new CreatePizzaWrapperDto(adminService.createPizzaImage("чизбургер_пицца"), "Чизбергер пицца", "традиционное", 40, "овощная", 560, 8));
            }
        };
    }
}
