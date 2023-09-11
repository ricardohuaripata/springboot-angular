package com.project.backend.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.common.UserPrincipal;
import com.project.backend.dto.SignupDto;
import com.project.backend.enumeration.Role;
import com.project.backend.exceptions.EmailExistsException;
import com.project.backend.exceptions.UserNotFoundException;
import com.project.backend.models.User;
import com.project.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User createNewUser(SignupDto signupDto) {
        try {
            User user = getUserByEmail(signupDto.getEmail());
            if (user != null) {
                throw new EmailExistsException();
            }
        } catch (UserNotFoundException e) {
            User newUser = new User();
            newUser.setEmail(signupDto.getEmail());
            newUser.setPassword(passwordEncoder.encode(signupDto.getPassword()));
            newUser.setEnabled(true);
            newUser.setRole(Role.ROLE_USER.name());
            User savedUser = userRepository.save(newUser);
            UserPrincipal userPrincipal = new UserPrincipal(savedUser);

            return savedUser;
        }
        return null;
    }
}
