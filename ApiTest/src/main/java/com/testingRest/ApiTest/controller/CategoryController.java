package com.testingRest.ApiTest.controller;

import com.testingRest.ApiTest.model.Category;
import com.testingRest.ApiTest.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    // Inject the CategoryService using autowiring
    @Autowired
    private CategoryService categoryService;

    // Handles HTTP GET request to retrieve all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        // Retrieve all categories using the CategoryService and return them with a 200 OK status code
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Handles HTTP POST request to create a new category
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        // Save the new category using the CategoryService and return it with a 200 OK status code
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(createdCategory);
    }

    // Handles HTTP DELETE request to delete a category by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        // Use the CategoryService to delete the category with the given ID
        categoryService.deleteCategory(id);
        // Return a 200 OK status code indicating successful deletion
        return ResponseEntity.ok().build();
    }
}
