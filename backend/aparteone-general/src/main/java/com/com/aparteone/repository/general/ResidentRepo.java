package com.com.aparteone.repository.general;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.general.Resident;

@Repository
public interface ResidentRepo extends JpaRepository<Resident, Integer> {
}
