package com.bounderoll.online_bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ThrowMoneyDto {
    private String fromCardNumber;
    private String toCardNumber;
    private Long amount;
}
