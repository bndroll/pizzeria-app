package com.bounderoll.online_bank.models;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "operation")
public class Operation {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "date")
    private Date data;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_from", referencedColumnName = "id")
    private Card cardFrom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_to", referencedColumnName = "id")
    private Card cardTo;
}


