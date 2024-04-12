package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.FacilityTime;

@Repository
public interface FacilityTimeRepo extends JpaRepository<FacilityTime, Integer> {
    public List<FacilityTime> findByFacilityId(Integer facilityId);
}
