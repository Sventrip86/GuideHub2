package com.testingRest.ApiTest.repostitory;


import com.testingRest.ApiTest.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
