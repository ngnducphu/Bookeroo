package com.rmit.sept.bk_bookservices.security;

import com.rmit.sept.bk_loginservices.security.SecurityConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({SecurityConfiguration.class})
public class BookSecurityConfiguration{
}