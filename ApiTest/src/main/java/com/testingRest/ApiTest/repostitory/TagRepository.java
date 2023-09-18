package com.testingRest.ApiTest.repostitory;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.testingRest.ApiTest.model.Tag;
import java.util.Optional;


@Repository

public interface TagRepository extends JpaRepository<Tag, Long>{

    Optional<Tag> findByName(String name);


}
