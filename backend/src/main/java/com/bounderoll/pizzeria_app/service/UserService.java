package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.config.jwt.JwtUtils;
import com.bounderoll.pizzeria_app.dto.LoginDto;
import com.bounderoll.pizzeria_app.dto.RegisterDto;
import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.model.User;
import com.bounderoll.pizzeria_app.model.enums.ERole;
import com.bounderoll.pizzeria_app.repository.RoleRepository;
import com.bounderoll.pizzeria_app.repository.UserRepository;
import com.bounderoll.pizzeria_app.response.JwtResponse;
import com.bounderoll.pizzeria_app.response.PromoCodeResponse;
import com.bounderoll.pizzeria_app.response.UserResponse;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;

@Service
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserService {
    private final User user;

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtUtils jwtUtils;
    private final MailSender mailSender;

    public UserService(
            final AuthenticationManager authenticationManager,
            final UserRepository userRepository,
            final PasswordEncoder passwordEncoder,
            final RoleRepository roleRepository,
            final JwtUtils jwtUtils,
            final MailSender mailSender) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.jwtUtils = jwtUtils;
        this.mailSender = mailSender;

        this.user = setCurrentSessionUser();
    }

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

    public UserResponse findMe() {
        return new UserResponse(user.getUsername(), user.getEmail(), user.getPizzaOrders());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public PromoCodeResponse checkPromoCode() {
        if (user.getPizzaOrders().size() % 10 == 0) {
            return PromoCodeResponse.builder()
                    .isPromoCode(true)
                    .amount(new Random().nextInt(5, 30))
                    .build();
        }

        return PromoCodeResponse.builder()
                .isPromoCode(false)
                .amount(0)
                .build();
    }

    private User setCurrentSessionUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl principal = (UserDetailsImpl) auth.getPrincipal();
        String username = principal.getUsername();
        return findByUsername(username).orElseThrow();
    }
}
