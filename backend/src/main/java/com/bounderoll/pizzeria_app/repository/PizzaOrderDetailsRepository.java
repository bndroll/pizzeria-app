package com.bounderoll.pizzeria_app.repository;

import com.bounderoll.pizzeria_app.model.PizzaOrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaOrderDetailsRepository extends JpaRepository<PizzaOrderDetails, Long> {
}
