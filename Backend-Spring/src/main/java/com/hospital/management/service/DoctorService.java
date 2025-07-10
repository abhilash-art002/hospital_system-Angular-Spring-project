package com.hospital.management.service;

import com.hospital.management.entity.Doctor;
import com.hospital.management.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }
    public Doctor getDoctorByEmail(String email) {
        return doctorRepository.findByEmail(email).orElse(null);
    }

    public Doctor updateDoctorByEmail(String email, Doctor doctor) {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(email);
        if (optionalDoctor.isPresent()) {
            Doctor existingDoctor = optionalDoctor.get();
            existingDoctor.setFullName(doctor.getFullName());
            existingDoctor.setQualification(doctor.getQualification());
            existingDoctor.setSpecialistField(doctor.getSpecialistField());
            existingDoctor.setMobile(doctor.getMobile());
            existingDoctor.setDob(doctor.getDob());
            return doctorRepository.save(existingDoctor);
        }
        return null;
    }

    public boolean deleteDoctorByEmail(String email) {
        System.out.println("Deleting doctor with email: " + email);
        
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(email);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            System.out.println("Doctor found: " + doctor.getFullName() + " (ID: " + doctor.getId() + ")");
            
            doctorRepository.delete(doctor);
            return true;
        }
        System.out.println("Doctor with email " + email + " not found.");
        return false;
    }


//    public Doctor updateDoctor(Long id, Doctor doctor) {
//        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
//        if (optionalDoctor.isPresent()) {
//            Doctor existingDoctor = optionalDoctor.get();
//            existingDoctor.setFullName(doctor.getFullName());
//            existingDoctor.setQualification(doctor.getQualification());
//            existingDoctor.setSpecialistField(doctor.getSpecialistField());       
//            
//            
//            return doctorRepository.save(existingDoctor);
//        }
//        return null;
//    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
    public Doctor loginDoctor(String email, String password) {
        Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(email);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            if (doctor.getPassword().equals(password)) {  // Plain text check (Not recommended)
                return doctor;  // Successful login
            }
        }
        return null;  // Invalid credentials
    }
    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        if (specialization != null) {
            return doctorRepository.findBySpecialistField(specialization);
        } else {
            return doctorRepository.findAll();
        }
    }
    //for count total no. of doctors
    public long countDoctors() {
        return doctorRepository.count();
    }
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor existingDoctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));

        existingDoctor.setFullName(updatedDoctor.getFullName());
        existingDoctor.setSpecialistField(updatedDoctor.getSpecialistField());
        existingDoctor.setEmail(updatedDoctor.getEmail());

        // Check if a new password is provided
        if (updatedDoctor.getPassword() != null && !updatedDoctor.getPassword().isEmpty()) {
            existingDoctor.setPassword(updatedDoctor.getPassword()); // Ideally, hash the password
        }

        return doctorRepository.save(existingDoctor);
    }


}

