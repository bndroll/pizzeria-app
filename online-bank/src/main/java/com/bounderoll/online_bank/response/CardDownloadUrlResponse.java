package com.bounderoll.online_bank.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardDownloadUrlResponse {
    private String url;
}
