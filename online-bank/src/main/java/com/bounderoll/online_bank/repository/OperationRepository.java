package com.bounderoll.online_bank.repository;

import com.bounderoll.online_bank.models.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
    @Query(
            value = "select * from operation o where o.card_from = :cardId or o.card_to = :cardId",
            nativeQuery = true
    )
    List<Operation> findByCardFrom(@Param("cardId") Long cardId);
}
