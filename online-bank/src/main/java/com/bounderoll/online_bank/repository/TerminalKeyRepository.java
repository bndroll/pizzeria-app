package com.bounderoll.online_bank.repository;

import com.bounderoll.online_bank.models.TerminalKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TerminalKeyRepository extends JpaRepository<TerminalKey, Long> {
    TerminalKey findByKey(UUID key);

    List<TerminalKey> findByCardId(Long cardId);
}
