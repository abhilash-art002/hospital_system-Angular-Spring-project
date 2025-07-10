package com.hospital.management.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.service.SpecialistService;

import com.hospital.management.entity.Specialist;
import com.hospital.management.repository.SpecialistRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200") // Change this to match your Angular app URL
public class SpecialistController {

    @Autowired
    private SpecialistService specialistService;

    @PostMapping("/add-specialist")
    public ResponseEntity<Map<String, String>> addSpecialist(@RequestBody Map<String, String> request) {
        String specName = request.get("specName");

        if (specName == null || specName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Specialist name is required"));
        }

        String message = specialistService.addSpecialist(specName);
        return ResponseEntity.ok(Map.of("message", message));
    }
   

    @GetMapping("/specialists")
    public ResponseEntity<List<Specialist>> getAllSpecialists() {
        List<Specialist> specialists = specialistService.getAllSpecialists();
        return ResponseEntity.ok(specialists);
    }
    @GetMapping("/specialists-count")
    public ResponseEntity<Long> countDoctors() {
        long specialistCount = specialistService.countSpecialist();
        return ResponseEntity.ok(specialistCount);
    }

}
