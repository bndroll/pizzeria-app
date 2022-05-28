package com.bounderoll.online_bank.service;

import com.bounderoll.online_bank.dto.CreateTerminalKeyDto;
import com.bounderoll.online_bank.models.Card;
import com.bounderoll.online_bank.models.TerminalKey;
import com.bounderoll.online_bank.repository.TerminalKeyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TerminalKeyService {
    private final TerminalKeyRepository terminalKeyRepository;

    private final CardService cardService;

    public TerminalKeyService(final TerminalKeyRepository terminalKeyRepository, final CardService cardService) {
        this.terminalKeyRepository = terminalKeyRepository;
        this.cardService = cardService;
    }

    public TerminalKey createTerminalKey(CreateTerminalKeyDto dto) {
        Card card = cardService.findById(dto.getCardId());

        return terminalKeyRepository.save(TerminalKey.builder()
                .card(card)
                .key(UUID.randomUUID())
                .build());
    }

    public List<TerminalKey> findTerminalKeyByCardId(Long cardId) {
        return terminalKeyRepository.findByCardId(cardId);
    }

    public TerminalKey findByKey(UUID key) {
        return terminalKeyRepository.findByKey(key);
    }
}
