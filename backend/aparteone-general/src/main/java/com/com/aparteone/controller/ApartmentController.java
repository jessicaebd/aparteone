package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;
import com.com.aparteone.service.ApartmentService;

@RestController
@RequestMapping("/api/apartment")
public class ApartmentController {
    @Autowired
    private ApartmentService apartmentService;

    @GetMapping
    public ResponseEntity<List<Apartment>> getAllApartments() {
        List<Apartment> apartments = apartmentService.getAllApartments();

        if(apartments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok(apartments);
        }
    }

    @GetMapping("/unit/{apartmentId}")
    public ResponseEntity<List<ApartmentUnit>> getApartmentUnitList(@PathVariable Integer apartmentId) {
        List<ApartmentUnit> apartmentUnits = apartmentService.getApartmentUnitList(apartmentId);

        if(apartmentUnits.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok(apartmentUnits);
        }
    }
}
