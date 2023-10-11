package com.testingRest.ApiTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.testingRest.ApiTest.repostitory.TagRepository;
import com.testingRest.ApiTest.model.Tag;

import java.util.Comparator;
import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;



    public List<Tag> getAllTags() {
        List<Tag> tags = tagRepository.findAllWithUsageCount();
        for (Tag tag : tags) {
            tag.setUsageCount((long) tag.getPosts().size());
        }
        return tags.stream()
                .sorted(Comparator.comparing(Tag::getUsageCount).reversed())
                .collect(Collectors.toList());
    }
    public Tag createTag(Tag tag) {
        if (tagExists(tag.getName())) {
            throw new RuntimeException("Tag with name: " + tag.getName() + " already exists.");
        }
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


    public boolean tagExists(String name) {
        return tagRepository.findByName(name).isPresent();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }



}
