package com.hospital.management.repository;

import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Fetch appointments by date
    List<Appointment> findByAppointDate(LocalDate date);
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId")
    List<Appointment> findByPatientId(@Param("patientId") Long patientId);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId")
    List<Appointment> findByDoctorId(@Param("doctorId") Long doctorId);
     
    long count();
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointDate >= :startDate AND a.appointDate <= :endDate")
    List<Appointment> findUpcomingAppointmentsByDoctorId(@Param("doctorId") Long doctorId, 
                                                               @Param("startDate") java.time.LocalDate startDate, 
                                                               @Param("endDate") java.time.LocalDate endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId ORDER BY a.appointDate DESC")
    List<Appointment> findRecentPatientsByDoctorId(@Param("doctorId") Long doctorId);

}
   


