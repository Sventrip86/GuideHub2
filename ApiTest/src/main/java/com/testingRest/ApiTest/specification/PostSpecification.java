package com.testingRest.ApiTest.specification;

import com.testingRest.ApiTest.model.Post;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.*;

public class PostSpecification {

    public static Specification<Post> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> {
            if (title == null) return  criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            return criteriaBuilder.like(root.get("title"), "%" + title + "%");
        };
    }
}
