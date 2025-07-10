package com.hospital.management.service;

import com.hospital.management.entity.Patient;
import com.hospital.management.repository.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Patient login(String email, String password) {
        Optional<Patient> patient = patientRepository.findByEmail(email);
        if (patient.isPresent() && patient.get().getPassword().equals(password)) {
            return patient.get(); // Login successful
        }
        return null; // Login failed
    }


    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

//    public Patient getPatientById(Long id) {
//        return patientRepository.findById(id).orElse(null);
//    }
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }


    public Patient updatePatient(Long id, Patient patient) {
        Optional<Patient> optionalPatient = patientRepository.findById(id);
        if (optionalPatient.isPresent()) {
            Patient existingPatient = optionalPatient.get();
            existingPatient.setFullName(patient.getFullName());
            existingPatient.setEmail(patient.getEmail());
            return patientRepository.save(existingPatient);
        }
        return null;
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    public long countPatients() {
        return patientRepository.count();
    }
    public boolean updatePassword(Long id, String newPassword) {
        Optional<Patient> optionalPatient = patientRepository.findById(id);
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            patient.setPassword(newPassword);
            patientRepository.save(patient);
            return true;
        }
        return false;
    }


}
