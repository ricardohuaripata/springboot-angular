package com.project.backend.common;

public class AppConstants {
    public static final String TOKEN_HEADER = "Jwt-Token";
    public static final String EMAIL_PATTERN = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
    public static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{6,32}$";
    public static final String AUTHORITIES = "authorities";

    public static final String TOKEN_UNVERIFIABLE = "Token cannot be verified.";
    public static final Long JWT_EXPIRATION_2Wk = 14 * 86400000L; // 2 Weeks

    public static final String[] PUBLIC_URLS = {
            "/api/v1/signup",
            "/api/v1/login"
    };

    public static final String OPTIONS_HTTP_METHOD = "options";
    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String ACCESS_DENIED = "You don't have permission to access this resource.";

    public static final String FORBIDDEN = "You need to be logged in to access this resource.";

    public static final String EMAIL_EXISTS = "User exists with this email address.";
    public static final String USER_NOT_FOUND = "No user found.";

    public static final String INTERNAL_SERVER_ERROR = "An error occurred while processing your request.";
    public static final String INCORRECT_CREDENTIALS = "Incorrect username or password.";

}
