package com.testingRest.ApiTest.service;

import com.testingRest.ApiTest.model.Category;
import com.testingRest.ApiTest.model.Post;
import com.testingRest.ApiTest.repostitory.CategoryRepository;
import com.testingRest.ApiTest.repostitory.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;


import java.util.List;
import java.util.Optional;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Method to get all posts from the database
    public List<Post> getAllPosts() {
        // Use the PostRepository to find and return all posts
        return postRepository.findAll();
    }
    public List<Post> searchPosts(String searchTerm) {
        PageRequest pageable = PageRequest.of(0, 100, Sort.by("title"));
        return postRepository.findByTitleContaining(searchTerm, pageable);
    }
    public List<Post> getPostsByTagName(String tagName) {
        return postRepository.findPostsByTagName(tagName);
    }

    // Method to get a post by its ID
    public Optional<Post> getPostById(Long id) {
        // Use the PostRepository to find the post by its ID and return it as an Optional
        return postRepository.findById(id);
    }

    @Autowired
    private CategoryRepository categoryRepository;

    // Method to save a post
    public Post savePost(Post post) {
        // Get the category of the post
        Category category = post.getCategory();

        // Check if the category already exists in the database by its name
        Optional<Category> existingCategory = categoryRepository.findByName(category.getName());

        // If the category already exists, use it; otherwise, save the new category
        Category savedCategory = existingCategory.orElseGet(() -> categoryRepository.save(category));

        // Set the saved category to the post
        post.setCategory(savedCategory);

        // Save the post using the PostRepository and return the saved post
        return postRepository.save(post);
    }

    // Method to delete a post by its ID
    public void deletePost(Long id) {
        // Use the PostRepository to delete the post with the given ID
        postRepository.deleteById(id);
    }
}
