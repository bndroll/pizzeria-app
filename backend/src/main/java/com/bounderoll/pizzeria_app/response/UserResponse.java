package com.bounderoll.pizzeria_app.response;

import com.bounderoll.pizzeria_app.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;

    public static String castRole(String roleName) {
        return roleName.split("_")[1].toLowerCase();
    }

    public static UserResponse cast(User user) {
        Set<String> responseRoles = user.getRoles()
                .stream()
                .map(role -> UserResponse.castRole(role.getName().name()))
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(responseRoles)
                .build();
    }
}
