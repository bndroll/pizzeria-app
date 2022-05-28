package com.bounderoll.pizzeria_app.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pizza_order_details")
public class PizzaOrderDetails {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private PizzaOrder order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pizza_id", referencedColumnName = "id")
    private Pizza pizza;

    @Column(name = "count")
    private int count;
}
