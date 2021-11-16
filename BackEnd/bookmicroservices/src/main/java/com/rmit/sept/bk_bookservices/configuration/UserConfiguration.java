package com.rmit.sept.bk_bookservices.configuration;

import com.rmit.sept.bk_loginservices.repository.RoleRepository;
import com.rmit.sept.bk_loginservices.repository.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

//@Configuration
public class UserConfiguration {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, RoleRepository roleRepository){
        return args -> {
            Role adminRole = Role.builder().code("ROLE_ADMIN").name("Admin").build();
            Role userRole = Role.builder().code("ROLE_PUBLIC").name("Public User").build();
            Role shopRole = Role.builder().code("ROLE_SHOP").name("Shop Owner").build();

            roleRepository.saveAll(
                    List.of(adminRole, userRole, shopRole)
            );

            User user = User.builder().username("user@bookeroo.com")
                    .password(bCryptPasswordEncoder.encode("password"))
                    .givenName("public").surname("user").role(userRole).enabled(true).build();
            User shopOwner = User.builder().username("shop@bookeroo.com")
                    .password(bCryptPasswordEncoder.encode("password"))
                    .givenName("shop").surname("owner").role(shopRole).enabled(true).build();
            User admin = User.builder().username("admin@bookeroo.com")
                    .password(bCryptPasswordEncoder.encode("password"))
                    .givenName("bookeroo").surname("admin").role(adminRole).enabled(true).build();
            userRepository.saveAll(
                    List.of(admin, shopOwner, user)
            );
        };
    }
}
