package com.bounderoll.pizzeria_app.response;

import com.bounderoll.pizzeria_app.model.PizzaOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String username;
    private String email;
    private Set<PizzaOrder> pizzaOrders;
}
