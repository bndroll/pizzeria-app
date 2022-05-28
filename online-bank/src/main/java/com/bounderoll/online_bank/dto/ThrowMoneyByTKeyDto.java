package com.bounderoll.online_bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ThrowMoneyByTKeyDto {
    private UUID key;
    private String cardNumber;
    private String person;
    private int secret;
    private Long amount;
}
