package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.dto.CreatePizzaWrapperDto;
import com.bounderoll.pizzeria_app.dto.UpdatePizzaDto;
import com.bounderoll.pizzeria_app.model.Pizza;
import com.bounderoll.pizzeria_app.repository.PizzaRepository;
import com.bounderoll.pizzeria_app.response.CategoryItemResponse;
import com.bounderoll.pizzeria_app.response.MostPopularPizzaResponse;
import com.bounderoll.pizzeria_app.response.PizzaResponse;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PizzaService {
    private final PizzaRepository pizzaRepository;

    @Value("${filesystem.url}")
    private String fileSystemBaseUrl;

    @Autowired
    public PizzaService(final PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    public PizzaResponse create(CreatePizzaWrapperDto dto) {
        UploadFileResponse response = uploadPictureRequest(dto.getTitle(), dto.getFile());

        Pizza pizza = pizzaRepository.save(Pizza.builder()
                .title(dto.getTitle())
                .imageUrl(response.getUrl())
                .type(dto.getType())
                .size(dto.getSize())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .rating(dto.getRating())
                .build()
        );

        return PizzaResponse.cast(pizza);
    }

    public List<PizzaResponse> findAll() {
        return pizzaRepository.findAll(Sort.by(Sort.Direction.ASC, "title"))
                .stream()
                .map(PizzaResponse::cast)
                .toList();
    }

    public PizzaResponse findById(Long id) {
        Optional<Pizza> pizza = pizzaRepository.findById(id);

        if (pizza.isEmpty())
            return null;

        return PizzaResponse.cast(pizza.orElseThrow());
    }

    public List<PizzaResponse> findByTitle(String title) {
        return pizzaRepository.findByTitle(title).stream().map(PizzaResponse::cast).toList();
    }

    public List<Pizza> findByTitleAndTypeAndSize(String title, String type, int size) {
        return pizzaRepository.findByTitleAndTypeAndSize(title, type, size);
    }

    public List<CategoryItemResponse> findPizzaCategories() {
        return pizzaRepository.findPizzaCategories();
    }

    public List<MostPopularPizzaResponse> findMostPopularPizzas() {
        return pizzaRepository.findMostPopularPizzas();
    }

    public List<MostPopularPizzaResponse> findMostOrderedPizzas() {
        return pizzaRepository.findMostOrderedPizzas();
    }

    public PizzaResponse update(Long id, UpdatePizzaDto dto) {
        Optional<Pizza> pizzaOptional = pizzaRepository.findById(id);

        if (pizzaOptional.isEmpty())
            return null;

        Pizza pizza = pizzaOptional.orElseThrow();

        pizza.setPrice(dto.getPrice());
        pizza.setRating(dto.getRating());

        pizza = pizzaRepository.save(pizza);

        return PizzaResponse.cast(pizza);
    }

    public PizzaResponse updatePhotoById(Long id, MultipartFile file) {
        Optional<Pizza> pizzaOptional = pizzaRepository.findById(id);

        if (pizzaOptional.isEmpty())
            return null;

        Pizza pizza = pizzaOptional.orElseThrow();

        UploadFileResponse response = uploadPictureRequest(pizza.getTitle(), file);

        pizza.setImageUrl(response.getUrl());
        pizza = pizzaRepository.save(pizza);

        return PizzaResponse.cast(pizza);
    }

    public List<PizzaResponse> updatePizzaGroupPhotoByTitle(String title, MultipartFile file) {
        List<Pizza> pizzas = pizzaRepository.findByTitle(title);

        if (pizzas == null)
            return null;

        UploadFileResponse response = uploadPictureRequest(title, file);
        List<PizzaResponse> pizzasResponse = new ArrayList<>();

        pizzas.forEach(pizza -> {
            pizza.setImageUrl(response.getUrl());
            Pizza savedPizza = pizzaRepository.save(pizza);
            pizzasResponse.add(PizzaResponse.cast(savedPizza));
        });

        return pizzasResponse;
    }

    public PizzaResponse deleteById(Long id) {
        Optional<Pizza> pizza = pizzaRepository.findById(id);

        if (pizza.isEmpty())
            return null;

        pizzaRepository.deleteById(id);

        return PizzaResponse.cast(pizza.get());
    }

    public List<PizzaResponse> deleteByTitle(String title) {
        List<Pizza> pizzas = pizzaRepository.findByTitle(title);

        pizzaRepository.deleteByTitle(title);

        return pizzas.stream().map(PizzaResponse::cast).toList();
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
}
