package com.example.prodBackend.Service;

import com.example.prodBackend.Model.Staff;
import com.example.prodBackend.Repo.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public boolean authenticate(String email, String password) {
        Staff staff = staffRepository.findByEmail(email);

        if (staff != null && staff.getPassword().equals(password)) {
            return true;
        }

        return false;
    }

    public Staff getStaffByEmail(String email) {
        Staff staff = staffRepository.findByEmail(email);

        if (staff != null) {
            return staff;
        }

        return null;

    }
}
