package com.bounderoll.pizzeria_app.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "pizza")
public class Pizza {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private int size;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private int price;

    @Column(name = "rating")
    private int rating;

    @OneToMany(mappedBy = "pizza", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PizzaOrderDetails> orders = new HashSet<>();
}
