package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.model.User;
import com.bounderoll.pizzeria_app.response.PromoCodeResponse;
import com.bounderoll.pizzeria_app.response.UserResponse;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class IdentityService {
    private final User user;

    private final UserService userService;

    public IdentityService(final UserService userService) {
        this.userService = userService;
        this.user = setCurrentSessionUser();
    }

    public UserResponse findMe() {
        Set<String> roleResponse = user.getRoles()
                .stream()
                .map(role -> UserResponse.castRole(role.getName().name()))
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roleResponse)
                .build();
    }

    public Long getUserId() {
        return this.user.getId();
    }

    public PromoCodeResponse checkPromoCode() {
        boolean cond = user.getPizzaOrders().size() % 10 == 0;

        return PromoCodeResponse.builder()
                .isPromoCode(cond)
                .amount(cond ? new Random().nextInt(5, 30) : 0)
                .build();
    }

    private User setCurrentSessionUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl principal = (UserDetailsImpl) auth.getPrincipal();
        String username = principal.getUsername();
        return userService.findByUsername(username).orElseThrow();
    }
}
