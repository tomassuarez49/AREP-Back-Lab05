package com.edu.eci.arep.service;

import com.edu.eci.arep.Property;
import com.edu.eci.arep.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property updateProperty(Long id, Property updatedProperty) {
        return propertyRepository.findById(id).map(property -> {
            property.setAddress(updatedProperty.getAddress());
            property.setPrice(updatedProperty.getPrice());
            property.setSize(updatedProperty.getSize());
            property.setDescription(updatedProperty.getDescription());
            return propertyRepository.save(property);
        }).orElseThrow(() -> new RuntimeException("Property not found with ID: " + id));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
