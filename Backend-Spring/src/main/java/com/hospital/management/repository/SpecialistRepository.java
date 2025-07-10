package com.hospital.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.management.entity.Specialist;

@Repository
public interface SpecialistRepository extends JpaRepository<Specialist, Integer> {
    boolean existsBySpecName(String specName);
    long count();
}