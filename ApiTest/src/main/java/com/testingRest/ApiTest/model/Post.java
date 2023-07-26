package com.testingRest.ApiTest.model;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;


@Entity
@Table(name = "posts")
@EntityListeners(AuditingEntityListener.class)

public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    public Post(String title, String body, Date date) {
        this.title = title;
        this.body = body;
        this.date = date;
    }

    @Column
    private String title;

    @Column
    private String body;



    @Column(name = "post_date", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date date;

    // No-arg constructor
    public Post() {
    }





    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}


