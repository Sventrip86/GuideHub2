package com.testingRest.ApiTest.repostitory;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.testingRest.ApiTest.model.Tag;


@Repository

public interface TagRepository extends JpaRepository<Tag, Long>{

    public Tag createTag(Tag tag);


}
