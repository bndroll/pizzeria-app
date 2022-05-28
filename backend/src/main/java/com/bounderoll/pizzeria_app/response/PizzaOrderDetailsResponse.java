package com.bounderoll.pizzeria_app.response;

import com.bounderoll.pizzeria_app.model.PizzaOrderDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PizzaOrderDetailsResponse {
    private Long id;
    private PizzaResponse pizza;
    private int count;

    public static PizzaOrderDetailsResponse cast(PizzaOrderDetails pizzaOrderDetails) {
        PizzaResponse pizzaResponse = PizzaResponse.cast(pizzaOrderDetails.getPizza());

        return PizzaOrderDetailsResponse.builder()
                .id(pizzaOrderDetails.getId())
                .pizza(pizzaResponse)
                .count(pizzaOrderDetails.getCount())
                .build();
    }
}
