package com.bounderoll.online_bank.response;

import com.bounderoll.online_bank.models.Card;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CardResponse {
    private Long id;
    private String number;
    private String person;
    private int secret;
    private Long amount;

    public static CardResponse cast(Card card) {
        return CardResponse.builder()
                .id(card.getId())
                .number(card.getNumber())
                .person(card.getPerson())
                .secret(card.getSecret())
                .amount(card.getAmount())
                .build();
    }
}
