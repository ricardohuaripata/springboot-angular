package com.project.backend.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.common.AppConstants;
import com.project.backend.common.UserPrincipal;
import com.project.backend.dto.LoginDto;
import com.project.backend.dto.SignupDto;
import com.project.backend.models.User;
import com.project.backend.services.JwtTokenService;
import com.project.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupDto signupDto) {
        User savedUser = userService.createNewUser(signupDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));
        User loginUser = userService.getUserByEmail(loginDto.getEmail());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);
        HttpHeaders newHttpHeaders = new HttpHeaders();
        newHttpHeaders.add(AppConstants.TOKEN_HEADER, jwtTokenService.generateToken(userPrincipal));
        return new ResponseEntity<>(loginUser, newHttpHeaders, HttpStatus.OK);
    }
}
