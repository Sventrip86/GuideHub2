package com.testingRest.ApiTest.service;

import com.testingRest.ApiTest.model.Category;
import com.testingRest.ApiTest.repostitory.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Method to get all categories from the database
    public List<Category> getAllCategories() {
        // Use the CategoryRepository to find and return all categories
        return categoryRepository.findAll();
    }

    // Method to create a new category
    public Category createCategory(Category category) {
        // Save the new category using the CategoryRepository and return the saved category
        return categoryRepository.save(category);
    }

    // Method to delete a category by its ID
    public void deleteCategory(Long id) {
        // Use the CategoryRepository to find the category by its ID
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            // If the category exists, delete it using the CategoryRepository
            categoryRepository.delete(category.get());
        } else {
            // If the category with the given ID does not exist, throw a RuntimeException
            throw new RuntimeException("Category not found for the id : " + id);
        }
    }
}
