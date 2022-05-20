package com.bounderoll.pizzeria_app.repository;

import com.bounderoll.pizzeria_app.model.Pizza;
import com.bounderoll.pizzeria_app.response.CategoryResponseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {
    List<Pizza> findByTitle(@Param("title") String title);

    @Query(value = "SELECT new com.bounderoll.pizzeria_app.response.CategoryResponseItem(p.category, AVG(p.rating) as rating)" +
                   " FROM Pizza AS p GROUP BY p.category order by rating desc")
    List<CategoryResponseItem> findPizzaCategories();

    @Query(
            value = "select * from pizza p where p.title = :title and p.type = :type and p.size = :size",
            nativeQuery = true
    )
    List<Pizza> findByTitleAndTypeAndSize(
            @Param("title") String title,
            @Param("type") String type,
            @Param("size") int size
    );

    @Transactional
    @Modifying
    @Query(
            value = "delete from pizza p where p.title = :title",
            nativeQuery = true
    )
    void deleteByTitle(@Param("title") String title);
}
