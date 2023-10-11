package com.testingRest.ApiTest.repostitory;


import com.testingRest.ApiTest.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContaining(String searchTerm, Pageable pageable);

    @Query("select p from Post p join p.tags t where t.name = :tagName")
    List<Post> findPostsByTagName(@Param("tagName") String tagName);

    // Add more methods as per your requirements
}






