package com.siddesh.portfolio.controller;

import com.siddesh.portfolio.entity.ContactSubmission;
import com.siddesh.portfolio.repository.ContactSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactSubmissionRepository contactSubmissionRepository;

    @PostMapping("/contact")
    public ResponseEntity<?> submitContactForm(@RequestBody ContactSubmission submission) {
        ContactSubmission saved = contactSubmissionRepository.save(submission);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Contact submission received");
        response.put("submission", saved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/submissions")
    public ResponseEntity<List<ContactSubmission>> getSubmissions() {
        List<ContactSubmission> list = contactSubmissionRepository.findAllByOrderBySubmittedAtDesc();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/admin/submissions/{id}")
    public ResponseEntity<?> deleteSubmission(@PathVariable Long id) {
        if (contactSubmissionRepository.existsById(id)) {
            contactSubmissionRepository.deleteById(id);
            Map<String, String> res = new HashMap<>();
            res.put("message", "Submission deleted");
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }
}
