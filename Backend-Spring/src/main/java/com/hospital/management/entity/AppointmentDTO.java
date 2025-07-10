package com.hospital.management.entity;

import java.time.LocalDate;

public class AppointmentDTO {
	private Long id;
    private String fullName;
    private String gender;
    private int age;
    private LocalDate appointmentDate;
    private String email;
    private String phno;
    private String diseases;
    private String address;
    private String status;
    private DoctorDTO doctor;
    private PatientDTO patient;
    
	public Long getId() {
		return id;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhno() {
		return phno;
	}
	public void setPhno(String phno) {
		this.phno = phno;
	}
	public String getDiseases() {
		return diseases;
	}
	public void setDiseases(String diseases) {
		this.diseases = diseases;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public PatientDTO getPatient() {
		return patient;
	}
	public void setPatient(PatientDTO patient) {
		this.patient = patient;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	
	public void setAppointmentDate(LocalDate localDate) {
		this.appointmentDate = localDate;
	}
	public DoctorDTO getDoctor() {
		return doctor;
	}
	public void setDoctor(DoctorDTO doctor) {
		this.doctor = doctor;
	}

}
