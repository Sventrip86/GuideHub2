package com.testingRest.ApiTest.repostitory;


import com.testingRest.ApiTest.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;



public interface PostRepository extends CrudRepository<Post, Long>, JpaSpecificationExecutor<Post> {
}



