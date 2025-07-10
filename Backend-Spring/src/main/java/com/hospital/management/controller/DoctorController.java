package com.hospital.management.controller;

import com.hospital.management.entity.Doctor;
import com.hospital.management.service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
        return new ResponseEntity<>(doctorService.registerDoctor(doctor), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(@RequestParam(name = "specialization", required = false) String specialization) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }



    // ✅ Fixed Mapping
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable("id") Long id, @RequestBody Doctor doctor) {
        return new ResponseEntity<>(doctorService.updateDoctor(id, doctor), HttpStatus.OK);
    }

    // Get doctor by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Doctor> getDoctorByEmail(@PathVariable("email") String email) {
        Doctor doctor = doctorService.getDoctorByEmail(email);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    // Update doctor by email
    @PutMapping("/email/{email}")
    public ResponseEntity<Doctor> updateDoctorByEmail(@PathVariable("email") String email, @RequestBody Doctor doctor) {
        Doctor updatedDoctor = doctorService.updateDoctorByEmail(email, doctor);
        return updatedDoctor != null ? ResponseEntity.ok(updatedDoctor) : ResponseEntity.notFound().build();
    }

    // Delete doctor by email 
    
    @DeleteMapping("/email/{email}")
    public ResponseEntity<String> deleteDoctorByEmail(@PathVariable("email") String email) {
        boolean deleted = doctorService.deleteDoctorByEmail(email);
        if (deleted) {
            return ResponseEntity.ok("Doctor deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return new ResponseEntity<>("Doctor deleted successfully", HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Doctor> loginDoctor(@RequestBody Doctor doctor) {
        Doctor loggedInDoctor = doctorService.loginDoctor(doctor.getEmail(), doctor.getPassword());
        return loggedInDoctor != null ? ResponseEntity.ok(loggedInDoctor) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countDoctors() {
        long doctorCount = doctorService.countDoctors();
        return ResponseEntity.ok(doctorCount);
    }


}
