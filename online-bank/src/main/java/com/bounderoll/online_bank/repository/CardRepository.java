package com.bounderoll.online_bank.repository;

import com.bounderoll.online_bank.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByNumber(String number);
}
