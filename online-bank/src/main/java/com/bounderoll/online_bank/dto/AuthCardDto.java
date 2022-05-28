package com.bounderoll.online_bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthCardDto {
    private String number;
    private String person;
    private int secret;
}
