package com.hospital.management.controller;

import com.hospital.management.entity.Appointment;
import com.hospital.management.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment) {
        System.out.println("Received appointment: " + appointment);
        return new ResponseEntity<>(appointmentService.addAppointment(appointment), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable(name = "id") Long id) {
        try {
            Appointment appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserId(@PathVariable(name = "userId") Long userId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByUserId(userId);
        return appointments.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorId(@PathVariable(name = "doctorId") Long doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        return appointments.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(appointments);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<?> getAppointmentsByDate(@PathVariable(name = "date") String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<Appointment> appointments = appointmentService.getAppointmentsByDate(localDate);
            return ResponseEntity.ok(appointments);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Use YYYY-MM-DD.");
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable(name = "id") Long id, @RequestBody Appointment appointment) {
        String status = appointment.getStatus().trim().toLowerCase();
        if (status.isEmpty()) {
            return ResponseEntity.badRequest().body("Status cannot be empty.");
        }
        try {
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(updatedAppointment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable(name = "id") Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok("Appointment deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countDoctors() {
        long appointmentCount = appointmentService.countAppointments();
        return ResponseEntity.ok(appointmentCount);
    }
    
    @GetMapping("/upcoming/{doctorId}")
    public ResponseEntity<List<Appointment>> findUpcomingAppointmentsByDoctorId(@PathVariable(name = "doctorId") Long doctorId) {
        List<Appointment> appointments = appointmentService.findUpcomingAppointmentsByDoctorId(doctorId);
        if (appointments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(appointments);
    }
    @GetMapping("/doctor/{doctorId}/recent-patients")
    public ResponseEntity<List<Map<String, String>>> getRecentPatientsByDoctor(@PathVariable("doctorId") Long doctorId) {
        List<Map<String, String>> recentPatients = appointmentService.getRecentPatientsByDoctor(doctorId);
        if (recentPatients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(recentPatients);
    }




}
