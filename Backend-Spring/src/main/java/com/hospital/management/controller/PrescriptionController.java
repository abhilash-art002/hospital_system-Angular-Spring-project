package com.hospital.management.controller;

import com.hospital.management.dto.PatientPrescriptionDTO;
import com.hospital.management.entity.Prescription;
import com.hospital.management.service.PrescriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/{appointmentId}")
    public ResponseEntity<Prescription> addPrescription(
            @PathVariable("appointmentId") Long appointmentId, 
            @RequestBody Prescription prescription) {
        return new ResponseEntity<>(prescriptionService.addPrescription(appointmentId, prescription), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable("id") Long id) {
        Prescription prescription = prescriptionService.getPrescriptionById(id);
        return ResponseEntity.ok(prescription);
    }
    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.ok("Prescription deleted successfully");
    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<PatientPrescriptionDTO> getPrescribedMedicinesAndPrescriptionDetailsByPatientId(@PathVariable("patientId") Long patientId) {
      PatientPrescriptionDTO patientPrescriptionDTO = prescriptionService.getPrescribedMedicinesAndPrescriptionDetailsByPatientId(patientId);
      return ResponseEntity.ok(patientPrescriptionDTO);
    }
  }


