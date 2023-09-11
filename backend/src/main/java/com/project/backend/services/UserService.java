package com.project.backend.services;

import com.project.backend.dto.SignupDto;
import com.project.backend.models.User;

public interface UserService {
    User getUserByEmail(String email);
    User createNewUser(SignupDto signupDto);

}
