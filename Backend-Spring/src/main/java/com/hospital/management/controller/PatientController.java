package com.hospital.management.controller;

import com.hospital.management.entity.Patient;
import com.hospital.management.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.servlet.http.HttpSession; // This is automatically handled in Spring Boot
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        Patient createdPatient = patientService.registerPatient(patient);
        return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Patient patient, jakarta.servlet.http.HttpSession session) {
        Patient loggedInPatient = patientService.login(patient.getEmail(), patient.getPassword());
        if (loggedInPatient != null) {
            session.setAttribute("patientId", loggedInPatient.getId());
            return new ResponseEntity<>(loggedInPatient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long id) {
        Patient patient = patientService.getPatientById(id);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        Patient updatedPatient = patientService.updatePatient(id, patient);
        return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>("Patient deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentPatient(jakarta.servlet.http.HttpSession session) {
        Long patientId = (Long) session.getAttribute("patientId");
        if (patientId != null) {
            Patient currentPatient = patientService.getPatientById(patientId);
            return new ResponseEntity<>(currentPatient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Patient not found", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countDoctors() {
        long patientCount = patientService.countPatients();
        return ResponseEntity.ok(patientCount);
    }
    @PutMapping("/{id}/update-password")
    public ResponseEntity<String> updatePassword(@PathVariable("id") Long id, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");
        boolean isUpdated = patientService.updatePassword(id, newPassword);
        return isUpdated ? ResponseEntity.ok("Password updated successfully")
                         : ResponseEntity.badRequest().body("Update failed");
    }

}