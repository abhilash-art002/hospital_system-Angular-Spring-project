package com.hospital.management.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.management.entity.Specialist;

@Service
public class SpecialistService {

    @Autowired
    private com.hospital.management.repository.SpecialistRepository specialistRepository;
    public List<Specialist> getAllSpecialists() {
        return specialistRepository.findAll(); // ✅ Correct way to call findAll()
    }
    public String addSpecialist(String specName) {
        if (specialistRepository.existsBySpecName(specName)) {
            return "Specialist already exists!";
        }

        com.hospital.management.entity.Specialist specialist = new com.hospital.management.entity.Specialist(specName);
        specialistRepository.save(specialist);
        return "Specialist added successfully!";
    }
    public long countSpecialist() {
        return specialistRepository.count();
    }

}
