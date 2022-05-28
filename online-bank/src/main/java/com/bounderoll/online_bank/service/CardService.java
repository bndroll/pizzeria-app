package com.bounderoll.online_bank.service;

import com.bounderoll.online_bank.dto.*;
import com.bounderoll.online_bank.models.Card;
import com.bounderoll.online_bank.models.Operation;
import com.bounderoll.online_bank.models.TerminalKey;
import com.bounderoll.online_bank.repository.CardRepository;
import com.bounderoll.online_bank.repository.TerminalKeyRepository;
import com.bounderoll.online_bank.utils.Generator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final TerminalKeyRepository terminalKeyRepository;

    @Value("${downloadsystem.url}")
    private String downloadSystemUrl;

    private final OperationService operationService;

    public CardService(final CardRepository cardRepository,
                       final TerminalKeyRepository terminalKeyRepository,
                       final OperationService operationService) {
        this.cardRepository = cardRepository;
        this.terminalKeyRepository = terminalKeyRepository;
        this.operationService = operationService;
    }

    public Card create(final CreateCardDto dto) {
        return cardRepository.save(Card.builder()
                .number(Generator.generateCardNumber())
                .person(dto.getPerson())
                .secret(Generator.generateSecret())
                .amount(0L)
                .build()
        );
    }

    public Card login(final AuthCardDto dto) {
        Card card = cardRepository.findByNumber(dto.getNumber());

        if (!card.getPerson().equalsIgnoreCase(dto.getPerson()) || card.getSecret() != dto.getSecret())
            return null;

        return card;
    }

    public Card findById(Long id) {
        return cardRepository.findById(id).orElseThrow();
    }

    public Card findByNumber(String number) {
        return cardRepository.findByNumber(number);
    }

    public Operation upMoney(UpMoneyDto dto) {
        Card card = cardRepository.findByNumber(dto.getCardNumber());
        card.setAmount(card.getAmount() + dto.getAmount());
        card = cardRepository.save(card);
        return operationService.create(card);
    }

    public Operation throwMoney(ThrowMoneyDto dto) {
        Card cardFrom = cardRepository.findByNumber(dto.getFromCardNumber());
        Card cardTo = cardRepository.findByNumber(dto.getToCardNumber());

        cardFrom.setAmount(cardFrom.getAmount() - dto.getAmount());
        cardTo.setAmount(cardTo.getAmount() + dto.getAmount());

        cardFrom = cardRepository.save(cardFrom);
        cardTo = cardRepository.save(cardTo);

        return operationService.create(cardFrom, cardTo);
    }

    public Operation throwMoneyByTKey(ThrowMoneyByTKeyDto dto) {
        Card cardFrom = cardRepository.findByNumber(dto.getCardNumber());
        TerminalKey terminalKey = terminalKeyRepository.findByKey(dto.getKey());
        Card cardTo = cardRepository.findById(terminalKey.getCard().getId()).orElseThrow();

        cardFrom.setAmount(cardFrom.getAmount() - dto.getAmount());
        cardTo.setAmount(cardTo.getAmount() + dto.getAmount());

        cardFrom = cardRepository.save(cardFrom);
        cardTo = cardRepository.save(cardTo);

        return operationService.create(cardFrom, cardTo);
    }

    public String getCardUrl(String number, String person, int secret) {
        return downloadSystemUrl + "/download-card/" + number + "/" + person + "/" + secret;
    }
}
