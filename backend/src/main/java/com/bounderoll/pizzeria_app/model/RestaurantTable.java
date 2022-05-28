package com.bounderoll.pizzeria_app.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "restaurant_table")
public class RestaurantTable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "number")
    private int number;

    @OneToMany(mappedBy = "table", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<RestaurantTableOrder> orders = new HashSet<>();
}
