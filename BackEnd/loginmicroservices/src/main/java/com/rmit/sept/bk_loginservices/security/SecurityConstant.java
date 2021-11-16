package com.rmit.sept.bk_loginservices.security;

public class SecurityConstant {

    public static final String SIGN_UP_URL = "/api/users/login";
    public static final String SIGN_IN_URL = "/api/users/register";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3000_000; //50 minutes
}