package com.bounderoll.pizzeria_app.repository;

import com.bounderoll.pizzeria_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    User findByActivationCode(String code);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
