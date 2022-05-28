package com.bounderoll.pizzeria_app.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "restaurant_table_order")
public class RestaurantTableOrder {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "table_id", referencedColumnName = "id")
    private RestaurantTable table;

    @Column(name = "time")
    private Date time;

    @Column(name = "hours")
    private int hours;
}
