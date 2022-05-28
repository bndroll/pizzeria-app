package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CratePizzaOrderDto {
    private List<CreatePizzaOrderDetailsDto> orderDetails;
    private String address;
}
