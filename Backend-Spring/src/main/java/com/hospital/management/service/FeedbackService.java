package com.hospital.management.service;

import com.hospital.management.entity.Feedback;
import com.hospital.management.entity.Patient;
import com.hospital.management.repository.FeedbackRepository;
import com.hospital.management.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final PatientRepository patientRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, PatientRepository patientRepository) {
        this.feedbackRepository = feedbackRepository;
        this.patientRepository = patientRepository;
    }

    public Feedback addFeedback(Long patientId, Feedback feedback) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));
        feedback.setPatient(patient);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByPatientId(Long patientId) {
        return feedbackRepository.findByPatientId(patientId);
    }
}
