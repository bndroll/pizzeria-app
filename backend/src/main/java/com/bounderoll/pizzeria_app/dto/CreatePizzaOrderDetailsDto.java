package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CreatePizzaOrderDetailsDto {
    private Long pizzaId;
    private int count;
}
