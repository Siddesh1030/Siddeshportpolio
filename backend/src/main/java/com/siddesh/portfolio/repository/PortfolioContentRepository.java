package com.siddesh.portfolio.repository;

import com.siddesh.portfolio.entity.PortfolioContent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PortfolioContentRepository extends JpaRepository<PortfolioContent, Long> {
    Optional<PortfolioContent> findBySectionKey(String sectionKey);
}
