package com.hospital.management.dto;

public class PrescriptionDetailsDTO {
	private Long id;
	  private String diagnosis;
	  private String dosages;
	  private String instructions;
	  
	  public PrescriptionDetailsDTO() {}
	  
	  public PrescriptionDetailsDTO(Long id, String diagnosis, String dosages, String instructions) {
	    this.id = id;
	    this.diagnosis = diagnosis;
	    this.dosages = dosages;
	    this.instructions = instructions;
	  }
	  public Long getId() {
		    return id;
		  }
		  
		  public void setId(Long id) {
		    this.id = id;
		  }
		  
		  public String getDiagnosis() {
		    return diagnosis;
		  }
		  
		  public void setDiagnosis(String diagnosis) {
		    this.diagnosis = diagnosis;
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


}
