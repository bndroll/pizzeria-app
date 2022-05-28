package com.bounderoll.pizzeria_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class CreatePizzaWrapperDto {
    private MultipartFile file;
    private String title;
    private String type;
    private int size;
    private String category;
    private int price;
    private int rating;
}
