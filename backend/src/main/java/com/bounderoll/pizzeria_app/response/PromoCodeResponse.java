package com.bounderoll.pizzeria_app.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PromoCodeResponse {
    private boolean isPromoCode;
    private int amount;
}
