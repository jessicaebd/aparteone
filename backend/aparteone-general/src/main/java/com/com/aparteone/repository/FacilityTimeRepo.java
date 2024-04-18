package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.FacilityTime;

@Repository
public interface FacilityTimeRepo extends JpaRepository<FacilityTime, Integer> {
    @Query(value = "select ft.id, ft.facility_id, ft.start_time, ft.end_time, ft.is_active, " +
            "case when ft.id not in (select fr.facility_time_id from facility_requests fr where to_char(fr.created_date, 'yyyy-mm-dd') = :date) " +
            "then 'Available' else 'Not Available' end as is_available, ft.created_date, ft.modified_date " +
            "from facility_times ft " +
            "where ft.is_active = true and ft.facility_id = :facilityId " +
            "order by start_time asc", nativeQuery = true)
    public List<FacilityTime> findFacilityTimeAvailable(Integer facilityId, String date);

}
