package com.bounderoll.pizzeria_app.response;

import com.bounderoll.pizzeria_app.model.PizzaOrder;
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
public class PizzaOrderResponse {
    private Long id;
    private Set<PizzaOrderDetailsResponse> orderDetails;
    private String address;

    public static PizzaOrderResponse cast(PizzaOrder pizzaOrder) {
        Set<PizzaOrderDetailsResponse> orderDetailsResponse = pizzaOrder.getPizzas()
                .stream()
                .map(PizzaOrderDetailsResponse::cast)
                .collect(Collectors.toSet());

        return PizzaOrderResponse.builder()
                .id(pizzaOrder.getId())
                .orderDetails(orderDetailsResponse)
                .address(pizzaOrder.getAddress())
                .build();
    }
}
