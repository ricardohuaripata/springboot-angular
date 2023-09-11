package com.project.backend.dto;

import lombok.*;

import javax.validation.constraints.Size;

import com.project.backend.annotation.PasswordRepeatEqual;
import com.project.backend.annotation.ValidEmail;
import com.project.backend.annotation.ValidPassword;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@PasswordRepeatEqual(passwordFieldFirst = "password", passwordFieldSecond = "passwordRepeat")
public class SignupDto {
    @ValidEmail
    private String email;

    @ValidPassword
    private String password;
    private String passwordRepeat;

    @Size(max = 64)
    private String firstName;

    @Size(max = 64)
    private String lastName;
}
