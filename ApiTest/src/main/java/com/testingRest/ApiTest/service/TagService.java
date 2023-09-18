package com.testingRest.ApiTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.testingRest.ApiTest.repostitory.TagRepository;
import com.testingRest.ApiTest.model.Tag;
import java.util.Optional;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;


    public List<Tag> getAllTags() {
        // Use the TagRepository to find and return all tags
        return tagRepository.findAll();
    }

    public Tag createTag(Tag tag) {
        // Save the new tag using the TagRepository and return the saved tag
        return tagRepository.save(tag);
    }

    public void deleteTag(Long id) {
        // Use the TagRepository to find the tag by its ID
        Optional<Tag> tag = tagRepository.findById(id);
        if (tag.isPresent()) {
            // If the tag exists, delete it using the TagRepository
            tagRepository.delete(tag.get());
        } else {
            // If the tag with the given ID does not exist, throw a RuntimeException
            throw new RuntimeException("Tag not found for the id : " + id);
        }
    }


}
