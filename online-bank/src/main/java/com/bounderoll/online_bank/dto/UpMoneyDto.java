package com.bounderoll.online_bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpMoneyDto {
    private String cardNumber;
    private Long amount;
}
