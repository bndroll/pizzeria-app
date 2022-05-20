package com.bounderoll.pizzeria_app.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryResponseItem {
    private String category;
    private double rating;
}
