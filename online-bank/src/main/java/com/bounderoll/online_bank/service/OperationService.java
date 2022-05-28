package com.bounderoll.online_bank.service;

import com.bounderoll.online_bank.models.Card;
import com.bounderoll.online_bank.models.Operation;
import com.bounderoll.online_bank.repository.OperationRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OperationService {
    private final OperationRepository operationRepository;

    public OperationService(final OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public Operation create(Card card) {
        return operationRepository.save(Operation.builder()
                .cardFrom(card)
                .cardTo(card)
                .data(new Date())
                .build());
    }

    public Operation create(Card cardFrom, Card cardTo) {
        return operationRepository.save(Operation.builder()
                .cardFrom(cardFrom)
                .cardTo(cardTo)
                .data(new Date())
                .build());
    }

    public List<Operation> findAllByCardId(Long cardId) {
        return operationRepository.findByCardFrom(cardId);
    }
}
