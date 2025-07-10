package com.hospital.management.dto;

import java.util.ArrayList;
import java.util.List;

public class PatientPrescriptionDTO {
	private List<PrescriptionDetailsDTO> prescriptionDetails;
	  private List<String> medicines;
	  
	  public PatientPrescriptionDTO() {
	    this.prescriptionDetails = new ArrayList<>();
	    this.medicines = new ArrayList<>();
	  }
	  
	  public void addPrescriptionDetails(PrescriptionDetailsDTO prescriptionDetails) {
	    this.prescriptionDetails.add(prescriptionDetails);
	  }
	  
	  public void addMedicines(List<String> medicines) {
	    this.medicines.addAll(medicines);
	  }
	  
	  public List<PrescriptionDetailsDTO> getPrescriptionDetails() {
	    return prescriptionDetails;
	  }
	  
	  public List<String> getMedicines() {
	    return medicines;
	  }


}
