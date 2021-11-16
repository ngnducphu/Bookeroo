package com.rmit.sept.bk_loginservices.service;

import com.rmit.sept.bk_loginservices.exception.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.Role;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.repository.RoleRepository;
import com.rmit.sept.bk_loginservices.repository.UserRepository;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private Role rolePublic;
    private Role roleShop;
    private boolean isSeeded;

    @BeforeEach
    public void init(){
        if(roleRepository.findRoleByCode("ROLE_PUBLIC") == null){
            rolePublic = Role.builder().name("Public User").code("ROLE_PUBLIC").build();
            roleRepository.save(rolePublic);

            roleShop = Role.builder().name("Shop Owner").code("ROLE_SHOP").build();
            roleRepository.save(roleShop);

            isSeeded = true;
        }
    }

    @AfterEach
    public void cleanUp(){
        if(isSeeded){
            roleRepository.deleteAll();
        }
    }

    @Test
    void test_saveUser_validUsername_pass(){
        String username = "test_username@rmit.com";
        String password = "password";
        String givenName = "given";
        String surname = "sur";
        String roleCode = "ROLE_PUBLIC";
        User user = User.builder().username(username).password(password).givenName(givenName)
                .surname(surname).build();
        user = userService.saveUser(user, roleCode);
        assertEquals(username, user.getUsername());
        assertNotEquals(password, user.getPassword());
        assertTrue(user.getConfirmPassword().isEmpty());
        assertEquals(givenName, user.getGivenName());
        assertEquals(surname, user.getSurname());
        assertEquals("ROLE_PUBLIC", user.getRole().getCode());
        userRepository.delete(user);
    }

    @Test
    void test_saveUser_duplicateUsername_fail(){
        User user = User.builder().username("test_usernameExists@rmit.com").password("password")
                .givenName("given").surname("sur").build();
        User duplicateUser = User.builder().username("test_usernameExists@rmit.com").password("password")
                .givenName("given").surname("sur").build();
        userRepository.save(duplicateUser);
        assertThrows(UsernameAlreadyExistsException.class, () -> {
            userService.saveUser(user, "ROLE_PUBLIC");
        });
        userRepository.delete(duplicateUser);
    }

    @Test
    void test_isShopOwner_true() {
    	String username = "test_username_shop@rmit.com";
        String password = "password";
        String givenName = "given";
        String surname = "sur";
        String roleCode = "ROLE_SHOP";
        User user = User.builder().username(username).password(password).givenName(givenName)
                .surname(surname).build();
        user = userService.saveUser(user, roleCode);
    	assertTrue(userService.isShopOwner(user));
        userRepository.delete(user);
    }

}
