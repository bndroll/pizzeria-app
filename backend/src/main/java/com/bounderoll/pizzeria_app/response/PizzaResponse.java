package com.bounderoll.pizzeria_app.response;

import com.bounderoll.pizzeria_app.model.Pizza;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PizzaResponse {
    private Long id;
    private String title;
    private String imageUrl;
    private String type;
    private int size;
    private String category;
    private int price;
    private int rating;

    public static PizzaResponse cast(Pizza pizza) {
        return PizzaResponse.builder()
                .id(pizza.getId())
                .title(pizza.getTitle())
                .imageUrl(pizza.getImageUrl())
                .type(pizza.getType())
                .size(pizza.getSize())
                .category(pizza.getCategory())
                .price(pizza.getPrice())
                .rating(pizza.getRating())
                .build();
    }
}
