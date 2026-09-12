package com.siddesh.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "portfolio_content")
public class PortfolioContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sectionKey; 

    @Column(columnDefinition = "LONGTEXT")
    private String jsonContent;

    public PortfolioContent() {}

    public PortfolioContent(String sectionKey, String jsonContent) {
        this.sectionKey = sectionKey;
        this.jsonContent = jsonContent;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSectionKey() { return sectionKey; }
    public void setSectionKey(String sectionKey) { this.sectionKey = sectionKey; }
    public String getJsonContent() { return jsonContent; }
    public void setJsonContent(String jsonContent) { this.jsonContent = jsonContent; }
}
