package com.testingRest.ApiTest.controller;

import com.testingRest.ApiTest.model.Post;
import com.testingRest.ApiTest.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    // Inject the PostService using autowiring
    @Autowired
    private PostService postService;

    // Handles HTTP GET request to retrieve all posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        // Retrieve all posts using the PostService and return them with a 200 OK status code
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Handles HTTP GET request to retrieve a post by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        // Use the PostService to find the post by its ID and return it with a 200 OK status code,
        // or if no post is found, return a 404 Not Found status code.
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Handles HTTP POST request to create a new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        // Save the new post using the PostService and return it with a 200 OK status code
        return ResponseEntity.ok(postService.savePost(post));
    }

    // Handles HTTP PUT request to update an existing post by its ID
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        // Use the PostService to find the post by its ID
        return postService.getPostById(id)
                .map(post -> {
                    // Update the post's title and body with the new values from updatedPost
                    post.setTitle(updatedPost.getTitle());
                    post.setBody(updatedPost.getBody());
                    // Save the updated post using the PostService and return it with a 200 OK status code
                    return ResponseEntity.ok(postService.savePost(post));
                })
                // If no post is found with the given ID, return a 404 Not Found status code
                .orElse(ResponseEntity.notFound().build());
    }

    // Handles HTTP DELETE request to delete a post by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        // Use the PostService to delete the post with the given ID
        postService.deletePost(id);
        // Return a 204 No Content status code indicating successful deletion
        return ResponseEntity.noContent().build();
    }
}
