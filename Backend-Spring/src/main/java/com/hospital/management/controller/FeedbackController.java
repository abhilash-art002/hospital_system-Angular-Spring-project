package com.hospital.management.controller;

import com.hospital.management.entity.Feedback;
import com.hospital.management.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/add/{patientId}")
    public ResponseEntity<Feedback> addFeedback(@PathVariable("patientId") Long patientId,
                                                @RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.addFeedback(patientId, feedback));
    }

    @GetMapping("/by-patient/{patientId}")
    public ResponseEntity<List<Feedback>> getFeedbackByPatientId(@PathVariable("patientId") Long patientId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByPatientId(patientId));
    }

}
