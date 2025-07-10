package com.hospital.management.service;

import com.hospital.management.dto.PatientPrescriptionDTO;
import com.hospital.management.dto.PrescriptionDetailsDTO;
import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.Prescription;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository, AppointmentRepository appointmentRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public Prescription addPrescription(Long appointmentId, Prescription prescription) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isEmpty()) {
            throw new RuntimeException("Appointment not found");
        }

        prescription.setAppointment(optionalAppointment.get());
        return prescriptionRepository.save(prescription);
    }

    public Prescription getPrescriptionByAppointment(Long appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId)
                .orElseThrow(() -> new RuntimeException("Prescription not found for this appointment"));
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    }
    
    public PatientPrescriptionDTO getPrescribedMedicinesAndPrescriptionDetailsByPatientId(Long patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);
        PatientPrescriptionDTO patientPrescriptionDTO = new PatientPrescriptionDTO();
        
        for (Appointment appointment : appointments) {
          Long appointmentId = appointment.getId();
          Prescription prescription = prescriptionRepository.findByAppointmentId(appointmentId).orElse(null);
          
          if (prescription != null) {
            PrescriptionDetailsDTO prescriptionDetailsDTO = new PrescriptionDetailsDTO();
            prescriptionDetailsDTO.setId(prescription.getId());
            prescriptionDetailsDTO.setDiagnosis(prescription.getDiagnosis());
            prescriptionDetailsDTO.setDosages(prescription.getDosages());
            prescriptionDetailsDTO.setInstructions(prescription.getInstructions());
            
            List<String> medicines = prescription.getMedicines();
            patientPrescriptionDTO.addPrescriptionDetails(prescriptionDetailsDTO);
            patientPrescriptionDTO.addMedicines(medicines);
          }
        }
        
        return patientPrescriptionDTO;
      }
    }



