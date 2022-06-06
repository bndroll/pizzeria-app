package com.bounderoll.online_bank.controller;

import com.bounderoll.online_bank.dto.*;
import com.bounderoll.online_bank.models.Card;
import com.bounderoll.online_bank.models.Operation;
import com.bounderoll.online_bank.models.TerminalKey;
import com.bounderoll.online_bank.response.*;
import com.bounderoll.online_bank.service.CardService;
import com.bounderoll.online_bank.service.OperationService;
import com.bounderoll.online_bank.service.TerminalKeyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/card")
@CrossOrigin(origins = "*")
public class CardController {
    private final CardService cardService;
    private final TerminalKeyService terminalKeyService;
    private final OperationService operationService;

    public CardController(final CardService cardService,
                          final TerminalKeyService terminalKeyService,
                          final OperationService operationService) {
        this.cardService = cardService;
        this.terminalKeyService = terminalKeyService;
        this.operationService = operationService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateCardDto dto) {
        return ResponseEntity.status(201).body(CardResponse.cast(cardService.create(dto)));
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(@RequestBody AuthCardDto dto) {
        Card card = cardService.login(dto);

        if (card == null)
            return ResponseEntity.status(400).body(new MessageResponse("Wrong card data"));

        return ResponseEntity.status(200).body(CardResponse.cast(card));
    }

    @PostMapping("/t-key")
    public ResponseEntity<?> createTerminalKey(@RequestBody CreateTerminalKeyDto dto) {
        if (cardService.findById(dto.getCardId()) == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Card with this id not found"));
        }

        return ResponseEntity.status(201)
                .body(TerminalKeyResponse.cast(terminalKeyService.createTerminalKey(dto)));
    }

    @GetMapping("/t-key/{cardId}")
    public ResponseEntity<?> findTerminalKeyByCardId(@PathVariable Long cardId) {
        List<TerminalKey> terminalKeys = terminalKeyService.findTerminalKeyByCardId(cardId);

        if (terminalKeys.size() == 0) {
            return ResponseEntity.status(404).body(new MessageResponse("Terminal key(s) not found for this card"));
        }

        return ResponseEntity.status(201)
                .body(terminalKeys.stream().map(TerminalKeyResponse::cast).toList());
    }

    @GetMapping("/operation/{cardId}")
    public ResponseEntity<?> findAllOperationsByCardId(@PathVariable Long cardId) {
        List<Operation> operations = operationService.findAllByCardId(cardId);

        if (operations.size() == 0) {
            return ResponseEntity.status(404).body(new MessageResponse("Operations not found for this card"));
        }

        return ResponseEntity.status(201)
                .body(operations.stream().map(OperationResponse::cast).toList());
    }

    @PatchMapping("/up-money")
    public ResponseEntity<?> upMoney(@RequestBody UpMoneyDto dto) {
        if (cardService.findByNumber(dto.getCardNumber()) == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Card with this number not found"));
        }

        return ResponseEntity.status(200)
                .body(OperationResponse.castAdd(cardService.upMoney(dto)));
    }

    @PatchMapping("/throw-money")
    public ResponseEntity<?> throwMoney(@RequestBody ThrowMoneyDto dto) {
        Card cardFrom = cardService.findByNumber(dto.getFromCardNumber());

        if (cardFrom == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Passing card with this number not found"));
        }

        if (cardFrom.getAmount() < dto.getAmount()) {
            return ResponseEntity.status(404).body(new MessageResponse("Passing card is low of money"));
        }

        if (cardService.findByNumber(dto.getToCardNumber()) == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Catcher card with this number not found"));
        }

        return ResponseEntity.status(200)
                .body(OperationResponse.cast(cardService.throwMoney(dto)));
    }

    @PatchMapping("/throw-money/t-key")
    public ResponseEntity<?> throwMoneyByTKey(@RequestBody ThrowMoneyByTKeyDto dto) {
        Card cardFrom = cardService.findByNumber(dto.getCardNumber());

        if (cardFrom == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Passing card with this number not found"));
        }

        if (!Objects.equals(dto.getPerson(), cardFrom.getPerson()) || dto.getSecret() != cardFrom.getSecret()) {
            return ResponseEntity.status(400).body(new MessageResponse("Wrong secret or person info"));
        }

        if (cardFrom.getAmount() < dto.getAmount()) {
            return ResponseEntity.status(400).body(new MessageResponse("Passing card is low of money"));
        }

        if (terminalKeyService.findByKey(dto.getKey()) == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Catcher t-key with this key not found"));
        }

        return ResponseEntity.status(200)
                .body(OperationResponse.cast(cardService.throwMoneyByTKey(dto)));
    }

    @GetMapping("/get-url/{cardId}")
    public ResponseEntity<?> getCardUrl(@PathVariable Long cardId) {
        Card card = cardService.findById(cardId);

        if (card == null) {
            return ResponseEntity.status(404).body(new MessageResponse("Card doesn't exist"));
        }

        return ResponseEntity.status(200)
                .body(new CardDownloadUrlResponse(
                        cardService.getCardUrl(card.getNumber(), card.getPerson(), card.getSecret())
                ));
    }
}
