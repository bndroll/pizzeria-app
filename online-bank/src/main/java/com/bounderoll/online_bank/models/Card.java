package com.bounderoll.online_bank.models;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "card")
public class Card {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "number")
    private String number;

    @Column(name = "person")
    private String person;

    @Column(name = "secret")
    private int secret;

    @Column(name = "amount")
    private Long amount;

    @OneToMany(mappedBy = "cardFrom", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Operation> operations = new HashSet<>();
}
