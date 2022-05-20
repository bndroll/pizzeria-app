package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.dto.CreatePizzaDto;
import com.bounderoll.pizzeria_app.dto.UpdatePizzaDto;
import com.bounderoll.pizzeria_app.model.Pizza;
import com.bounderoll.pizzeria_app.repository.PizzaRepository;
import com.bounderoll.pizzeria_app.response.CategoryResponseItem;
import com.bounderoll.pizzeria_app.response.UploadFileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class PizzaService {
    @Autowired
    PizzaRepository pizzaRepository;

    @Value("${filesystem.url}")
    private String fileSystemBaseUrl;

    public Pizza create(CreatePizzaDto dto) {
        Pizza pizza = new Pizza(
                dto.getTitle(),
                dto.getType(),
                dto.getSize(),
                dto.getCategory(),
                dto.getPrice(),
                dto.getRating()
        );

        return pizzaRepository.save(pizza);
    }

    public List<Pizza> findAll() {
        return pizzaRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
    }

    public Optional<Pizza> findById(Long id) {
        return pizzaRepository.findById(id);
    }

    public List<Pizza> findByTitle(String title) {
        return pizzaRepository.findByTitle(title);
    }

    public List<Pizza> findByTitleAndTypeAndSize(CreatePizzaDto dto) {
        return pizzaRepository.findByTitleAndTypeAndSize(dto.getTitle(), dto.getType(), dto.getSize());
    }

    public List<CategoryResponseItem> findPizzaCategories() {
        return pizzaRepository.findPizzaCategories();
    }

    public Optional<Pizza> update(Long id, UpdatePizzaDto dto) {
        Optional<Pizza> pizzaOptional = pizzaRepository.findById(id);

        if (pizzaOptional.isEmpty())
            return pizzaOptional;

        Pizza pizza = pizzaOptional.get();

        pizza.setPrice(dto.getPrice());
        pizza.setRating(dto.getRating());

        pizzaRepository.save(pizza);

        return Optional.of(pizza);
    }

    public Optional<Pizza> updatePhotoById(Long id, MultipartFile file) {
        Optional<Pizza> pizzaOptional = pizzaRepository.findById(id);

        if (pizzaOptional.isEmpty())
            return pizzaOptional;

        Pizza pizza = pizzaOptional.get();

        UploadFileResponse response = uploadPictureRequest(pizza.getTitle(), file);

        pizza.setImageUrl(response.getUrl());

        return Optional.of(pizza);
    }

    public List<Pizza> updatePizzaGroupPhotoByTitle(String title, MultipartFile file) {
        List<Pizza> pizzas = pizzaRepository.findByTitle(title);

        if (pizzas.size() == 0)
            return pizzas;

        UploadFileResponse response = uploadPictureRequest(title, file);

        pizzas.forEach(pizza -> pizza.setImageUrl(response.getUrl()));

        return pizzas;
    }

    private UploadFileResponse uploadPictureRequest(String pizzaTitle, MultipartFile file) {
        MultipartBodyBuilder multipartBodyBuilder = new MultipartBodyBuilder();
        multipartBodyBuilder.part("file", file.getResource());
        multipartBodyBuilder.part("title", pizzaTitle);

        WebClient webClient = WebClient.builder()
                .baseUrl(fileSystemBaseUrl)
                .build();

        UploadFileResponse response = webClient.post()
                .uri("/file")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .body(BodyInserters.fromMultipartData(multipartBodyBuilder.build()))
                .retrieve()
                .bodyToMono(UploadFileResponse.class)
                .block();

        if (response == null)
            throw new RuntimeException("Failed to save the file");

        return response;
    }

    public Optional<Pizza> deleteById(Long id) {
        Optional<Pizza> pizzaOptional = pizzaRepository.findById(id);

        if (pizzaOptional.isEmpty())
            return pizzaOptional;

        pizzaRepository.deleteById(id);

        return pizzaOptional;
    }

    public List<Pizza> deleteByTitle(String title) {
        List<Pizza> pizzas = pizzaRepository.findByTitle(title);

        pizzaRepository.deleteByTitle(title);

        return pizzas;
    }
}
