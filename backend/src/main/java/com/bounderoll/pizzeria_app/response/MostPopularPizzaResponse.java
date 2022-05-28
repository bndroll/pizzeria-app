package com.bounderoll.pizzeria_app.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MostPopularPizzaResponse {
    private Long id;
    private String title;
    private String image;
    private int size;
    private String type;
    private String category;
    private int price;
    private int rating;
    private Long ordersCount;
}
