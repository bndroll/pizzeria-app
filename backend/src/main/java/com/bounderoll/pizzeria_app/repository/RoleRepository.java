package com.bounderoll.pizzeria_app.repository;

import com.bounderoll.pizzeria_app.model.Role;
import com.bounderoll.pizzeria_app.model.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
