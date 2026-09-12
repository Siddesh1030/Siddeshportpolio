package com.siddesh.portfolio.controller;

import com.siddesh.portfolio.entity.PortfolioContent;
import com.siddesh.portfolio.repository.PortfolioContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @Autowired
    private PortfolioContentRepository portfolioContentRepository;

    @GetMapping
    public ResponseEntity<Map<String, String>> getAllPortfolioSections() {
        List<PortfolioContent> allSections = portfolioContentRepository.findAll();
        Map<String, String> response = new HashMap<>();

        for (PortfolioContent section : allSections) {
            response.put(section.getSectionKey(), section.getJsonContent());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{sectionKey}")
    public ResponseEntity<?> getSection(@PathVariable String sectionKey) {
        Optional<PortfolioContent> sectionOpt = portfolioContentRepository.findBySectionKey(sectionKey);
        if (sectionOpt.isPresent()) {
            return ResponseEntity.ok(sectionOpt.get().getJsonContent());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{sectionKey}")
    public ResponseEntity<?> updateSection(@PathVariable String sectionKey, @RequestBody String jsonContent) {
        Optional<PortfolioContent> existingOpt = portfolioContentRepository.findBySectionKey(sectionKey);
        PortfolioContent content;

        if (existingOpt.isPresent()) {
            content = existingOpt.get();
            content.setJsonContent(jsonContent);
        } else {
            content = new PortfolioContent(sectionKey, jsonContent);
        }

        portfolioContentRepository.save(content);
        Map<String, String> res = new HashMap<>();
        res.put("status", "success");
        res.put("sectionKey", sectionKey);
        return ResponseEntity.ok(res);
    }
}
