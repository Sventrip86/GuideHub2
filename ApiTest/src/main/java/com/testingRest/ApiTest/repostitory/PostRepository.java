package com.testingRest.ApiTest.repostitory;


import com.testingRest.ApiTest.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContaining(String searchTerm, Pageable pageable);
    // Add more methods as per your requirements
}






