package com.testingRest.ApiTest.service;

import com.testingRest.ApiTest.model.Category;
import com.testingRest.ApiTest.model.Post;
import com.testingRest.ApiTest.repostitory.CategoryRepository;
import com.testingRest.ApiTest.repostitory.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    @Autowired
    private CategoryRepository categoryRepository;
    public Post savePost(Post post) {
        // Get the category of the post, save it if it doesn't exist already
        Category category = post.getCategory();
        Category savedCategory = categoryRepository.findByName(category.getName())
                .orElseGet(() -> categoryRepository.save(category));

        // Set the saved category to the post
        post.setCategory(savedCategory);

        // Save the post
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
