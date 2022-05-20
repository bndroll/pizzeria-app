package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdatePizzaDto {
    private int price;
    private int rating;
}
