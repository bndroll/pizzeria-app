package com.bounderoll.pizzeria_app.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryItemResponse {
    private String category;
    private double rating;
    private long count;
}
