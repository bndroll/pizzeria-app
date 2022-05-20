package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePizzaDto {
    private String title;
    private String type;
    private int size;
    private String category;
    private int price;
    private int rating;
}
