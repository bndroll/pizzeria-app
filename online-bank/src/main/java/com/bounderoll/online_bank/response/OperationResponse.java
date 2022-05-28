package com.bounderoll.online_bank.response;

import com.bounderoll.online_bank.models.Operation;
import com.bounderoll.online_bank.models.TerminalKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class OperationResponse {
    private Long id;
    private Date date;
    private CardResponse cardFrom;
    private CardResponse cardTo;

    public static OperationResponse cast(Operation operation) {
        return OperationResponse.builder()
                .id(operation.getId())
                .date(operation.getData())
                .cardFrom(CardResponse.cast(operation.getCardFrom()))
                .cardTo(CardResponse.cast(operation.getCardTo()))
                .build();
    }

    public static OperationResponse castAdd(Operation operation) {
        return OperationResponse.builder()
                .id(operation.getId())
                .date(operation.getData())
                .cardTo(CardResponse.cast(operation.getCardFrom()))
                .build();
    }
}
