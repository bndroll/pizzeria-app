package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.config.jwt.JwtUtils;
import com.bounderoll.pizzeria_app.response.JwtResponse;
import com.bounderoll.pizzeria_app.dto.LoginDto;
import com.bounderoll.pizzeria_app.dto.RegisterDto;
import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.model.User;
import com.bounderoll.pizzeria_app.model.enums.ERole;
import com.bounderoll.pizzeria_app.repository.RoleRepository;
import com.bounderoll.pizzeria_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    MailSender mailSender;

    public User create(RegisterDto dto) {
        User user = new User(dto.getUsername(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()));

        Set<String> requestRoles = dto.getRoles();
        Set<Role> roles = new HashSet<>();

        if (requestRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role USER is not found"));

            roles.add(userRole);
        } else {
            requestRoles.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Role ADMIN is not found"));
                        roles.add(adminRole);
                    }

                    case "employee" -> {
                        Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                                .orElseThrow(() -> new RuntimeException("Role EMPLOYEE is not found"));
                        roles.add(employeeRole);
                    }

                    default -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role USER is not found"));
                        roles.add(userRole);
                    }
                }
            });
        }

        user.setActivationCode(UUID.randomUUID().toString());
        user.setRoles(roles);
        userRepository.save(user);

        sendMessage(user);

        return user;
    }

    private void sendMessage(User user) {
        String message = String.format(
                "Привет, %s! \n" +
                "Добро пожаловать в пиццерию. \n" +
                "Пожалуйста, перейдите по ссылке для активации аккаунта: http://localhost:8080/auth/activate/%s",
                user.getUsername(),
                user.getActivationCode()
        );

        mailSender.send(user.getEmail(), "activation code", message);
    }

    public boolean activateUser(String code) {
        User user = userRepository.findByActivationCode(code);

        if (!Objects.equals(user.getActivationCode(), code))
            return false;

        user.setActive(true);
        userRepository.save(user);

        return true;
    }

    public JwtResponse login(LoginDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return new JwtResponse(jwt);
    }
}
