package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.model.PizzaOrder;
import com.bounderoll.pizzeria_app.model.RestaurantTableOrder;
import com.bounderoll.pizzeria_app.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private final Long id;
    private final String username;
    private final String email;
    private final String password;
    private final boolean isActive;
    private final Collection<? extends GrantedAuthority> authorities;
    private final Collection<? extends PizzaOrder> pizzaOrders;
    private final Collection<? extends RestaurantTableOrder> tableOrders;

    public UserDetailsImpl(Long id,
                           String username,
                           String email,
                           String password,
                           boolean isActive,
                           Collection<? extends GrantedAuthority> authorities,
                           Collection<? extends PizzaOrder> pizzaOrders,
                           Collection<? extends RestaurantTableOrder> tableOrders) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.authorities = authorities;
        this.pizzaOrders = pizzaOrders;
        this.tableOrders = tableOrders;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.isActive(),
                authorities,
                user.getPizzaOrders(),
                user.getTableOrders()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActive() {
        return isActive;
    }

    public Collection<? extends PizzaOrder> getPizzaOrders() {
        return pizzaOrders;
    }

    public Collection<? extends RestaurantTableOrder> getTableOrders() {
        return tableOrders;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive();
    }
}
