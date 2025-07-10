package com.hospital.management.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "prescription")
public class Prescription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @Column(nullable = false)
    private String diagnosis;

    @ElementCollection
    @CollectionTable(name = "prescription_medicines", joinColumns = @JoinColumn(name = "prescription_id"))
    private List<String> medicines;

    @Column(nullable = false)
    private String dosages;

    @Column(nullable = false)
    private String instructions;

    public Prescription() {}

    public Prescription(Appointment appointment, String diagnosis, List<String> medicines, String dosages, String instructions) {
        this.appointment = appointment;
        this.diagnosis = diagnosis;
        this.medicines = medicines;
        this.dosages = dosages;
        this.instructions = instructions;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public List<String> getMedicines() {
		return medicines;
	}

	public void setMedicines(List<String> medicines) {
		this.medicines = medicines;
	}

	public String getDosages() {
		return dosages;
	}

	public void setDosages(String dosages) {
		this.dosages = dosages;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	

    // Getters and Setters
    
}
