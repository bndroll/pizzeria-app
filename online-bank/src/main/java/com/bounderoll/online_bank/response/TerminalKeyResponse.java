package com.bounderoll.online_bank.response;

import com.bounderoll.online_bank.models.TerminalKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class TerminalKeyResponse {
    private Long id;
    private UUID key;
    private CardResponse card;

    public static TerminalKeyResponse cast(TerminalKey terminalKey) {
        return TerminalKeyResponse.builder()
                .id(terminalKey.getId())
                .key(terminalKey.getKey())
                .card(CardResponse.cast(terminalKey.getCard()))
                .build();
    }
}
