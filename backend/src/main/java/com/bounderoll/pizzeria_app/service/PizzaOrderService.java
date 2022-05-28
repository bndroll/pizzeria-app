package com.bounderoll.pizzeria_app.service;

import com.bounderoll.pizzeria_app.dto.CratePizzaOrderDto;
import com.bounderoll.pizzeria_app.model.Pizza;
import com.bounderoll.pizzeria_app.model.PizzaOrder;
import com.bounderoll.pizzeria_app.model.PizzaOrderDetails;
import com.bounderoll.pizzeria_app.model.User;
import com.bounderoll.pizzeria_app.repository.PizzaOrderDetailsRepository;
import com.bounderoll.pizzeria_app.repository.PizzaOrderRepository;
import com.bounderoll.pizzeria_app.repository.PizzaRepository;
import com.bounderoll.pizzeria_app.response.PizzaOrderDetailsResponse;
import com.bounderoll.pizzeria_app.response.PizzaOrderResponse;
import com.bounderoll.pizzeria_app.response.PizzaResponse;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PizzaOrderService {
    private final UserService userService;
    private final IdentityService identityService;
    private final PizzaRepository pizzaRepository;
    private final PizzaOrderRepository pizzaOrderRepository;
    private final PizzaOrderDetailsRepository pizzaOrderDetailsRepository;

    public PizzaOrderService(
            final PizzaRepository pizzaRepository,
            final PizzaOrderRepository pizzaOrderRepository,
            final PizzaOrderDetailsRepository pizzaOrderDetailsRepository,
            final UserService userService,
            final IdentityService identityService) {

        this.pizzaRepository = pizzaRepository;
        this.pizzaOrderRepository = pizzaOrderRepository;
        this.pizzaOrderDetailsRepository = pizzaOrderDetailsRepository;
        this.userService = userService;
        this.identityService = identityService;
    }

    public PizzaOrderResponse create(CratePizzaOrderDto dto) {
        User user = userService.findById(identityService.getUserId()).orElseThrow();
        Set<PizzaOrderDetailsResponse> pizzaOrderDetailsResponse = new HashSet<>();

        PizzaOrder pizzaOrder = PizzaOrder.builder()
                .user(user)
                .address(dto.getAddress())
                .build();

        PizzaOrder pizzaOrderSaved = pizzaOrderRepository.save(pizzaOrder);

        Set<PizzaOrderDetails> pizzasOrderDetails = dto.getOrderDetails().stream().map(orderDetails -> {
            Pizza currentPizza = pizzaRepository.findById(orderDetails.getPizzaId()).orElseThrow();

            PizzaOrderDetails currentOrderDetails = PizzaOrderDetails.builder()
                    .id(orderDetails.getPizzaId())
                    .order(pizzaOrderSaved)
                    .pizza(currentPizza)
                    .count(orderDetails.getCount())
                    .build();

            PizzaResponse currentPizzaResponse = PizzaResponse.cast(currentPizza);

            pizzaOrderDetailsResponse.add(
                    PizzaOrderDetailsResponse.builder()
                            .id(currentOrderDetails.getId())
                            .pizza(currentPizzaResponse)
                            .count(currentOrderDetails.getCount())
                            .build()
            );

            return pizzaOrderDetailsRepository.save(currentOrderDetails);
        }).collect(Collectors.toSet());

        pizzaOrderSaved.setPizzas(pizzasOrderDetails);

        return PizzaOrderResponse.builder()
                .id(pizzaOrderSaved.getId())
                .orderDetails(pizzaOrderDetailsResponse)
                .address(pizzaOrderSaved.getAddress())
                .build();
    }

    public List<PizzaOrderResponse> findAll() {
        List<PizzaOrder> pizzaOrders = pizzaOrderRepository.findMyOrders(identityService.getUserId());
        return pizzaOrders.stream().map(PizzaOrderResponse::cast).toList();
    }

    public PizzaOrderResponse findById(Long id) {
        return PizzaOrderResponse.cast(pizzaOrderRepository.findById(id).orElseThrow());
    }
}
