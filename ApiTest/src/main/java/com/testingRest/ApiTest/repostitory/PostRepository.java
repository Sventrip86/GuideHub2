package com.testingRest.ApiTest.repostitory;


import com.testingRest.ApiTest.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContainingOrderByTitleAsc(String searchTerm);
    // Add more methods as per your requirements
}






