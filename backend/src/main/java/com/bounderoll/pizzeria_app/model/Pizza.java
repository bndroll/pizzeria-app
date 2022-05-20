package com.bounderoll.pizzeria_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pizza")
public class Pizza {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private int size;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private int price;

    @Column(name = "rating")
    @Max(value = 10)
    @Min(value = 1)
    private int rating;

    @OneToMany(mappedBy = "pizza", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PizzaOrderDetails> orders = new HashSet<>();

    public Pizza(String title, String type, int size, String category, int price, int rating) {
        this.title = title;
        this.type = type;
        this.size = size;
        this.category = category;
        this.price = price;
        this.rating = rating;
    }
}
