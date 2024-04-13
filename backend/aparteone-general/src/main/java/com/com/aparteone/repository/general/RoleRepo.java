package com.com.aparteone.repository.general;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.general.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {   
}
