package com.bounderoll.pizzeria_app.repository;

import com.bounderoll.pizzeria_app.model.PizzaOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PizzaOrderRepository extends JpaRepository<PizzaOrder, Long> {
    @Query(value = "select * from pizza_order o where o.user_id = :id order by o.id desc limit 10", nativeQuery = true)
    List<PizzaOrder> findMyOrders(Long id);
}
