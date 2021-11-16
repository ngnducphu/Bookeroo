package com.rmit.sept.bk_bookservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"com.rmit.sept.bk_loginservices.service", "com.rmit.sept.bk_loginservices.security",
		"com.rmit.sept.bk_bookservices"})
@EnableJpaRepositories({"com.rmit.sept.bk_loginservices.repository", "com.rmit.sept.bk_bookservices.repository"})
@EntityScan(basePackages = {"com.rmit.sept.bk_loginservices.model", "com.rmit.sept.bk_bookservices.model"})
public class BookmicroservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookmicroservicesApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}

}