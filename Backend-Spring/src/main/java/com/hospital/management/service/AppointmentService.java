package com.hospital.management.service;

import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.AppointmentDTO;
import com.hospital.management.entity.DoctorDTO;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.Doctor;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, 
                              PatientRepository patientRepository, 
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment addAppointment(Appointment appointment) {
        Patient patient = patientRepository.findById(appointment.getPatient().getId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointDate(date);
    }

    public Appointment updateAppointmentStatus(Long id, String status) {
        Appointment appointment = getAppointmentById(id); // Throws exception if not found.
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = getAppointmentById(id); // Throws exception if not found.
        appointmentRepository.delete(appointment);
    }

    public List<Appointment> getAppointmentsByUserId(Long userId) {
        return appointmentRepository.findByPatientId(userId);  
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);  
    }

    public AppointmentDTO getAppointmentDTOById(Long appointmentId) {
        Appointment appointment = getAppointmentById(appointmentId);
        Hibernate.initialize(appointment.getDoctor());  

        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setId(appointment.getId());
        appointmentDTO.setFullName(appointment.getFullname());
        appointmentDTO.setAppointmentDate(appointment.getAppointDate());

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setId(appointment.getDoctor().getId());
        doctorDTO.setFullName(appointment.getDoctor().getFullName());
        doctorDTO.setQualification(appointment.getDoctor().getQualification());

        appointmentDTO.setDoctor(doctorDTO);
        return appointmentDTO;
    }

    // Returns the appointment directly or throws an exception if not found.
    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + appointmentId));
    }
    public long countAppointments() {
        return appointmentRepository.count();
    }
    
    
    
    public List<Appointment> findUpcomingAppointmentsByDoctorId(Long doctorId) {
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate nextWeek = today.plusWeeks(1);
        return appointmentRepository.findUpcomingAppointmentsByDoctorId(doctorId, today, nextWeek);
    }
    public List<Map<String, String>> getRecentPatientsByDoctor(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findRecentPatientsByDoctorId(doctorId);
        
        // Extract unique patient names and their diseases
        Map<Long, Map<String, String>> patientMap = new LinkedHashMap<>();
        for (Appointment appointment : appointments) {
            patientMap.put(appointment.getPatient().getId(), 
                Map.of("name", appointment.getPatient().getFullName(), 
                       "condition", appointment.getDiseases()));
        }

        return new ArrayList<>(patientMap.values());
    }



}
