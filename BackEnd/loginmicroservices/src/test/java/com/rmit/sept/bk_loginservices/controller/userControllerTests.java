package com.rmit.sept.bk_loginservices.controller;

import com.rmit.sept.bk_loginservices.model.Role;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.payload.NewUserRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.service.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.service.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;

import java.security.Principal;
import java.util.Optional;
import java.util.stream.Stream;

import static java.text.MessageFormat.format;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class userControllerTests {

    @Spy
    @InjectMocks
    private UserController userController;

    @Spy
    private MapValidationErrorService mapValidationErrorService;

    @Mock
    private UserService userService;

    @Spy
    private UserValidator userValidator;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @Spy
    private BindingResult bindingResult;

    @Mock
    private ResponseEntity<?> errorMap;

    @Mock
    private Principal principal;


    @Test
    void test_login_validUser_pass(){
        LoginRequest loginRequest = LoginRequest.builder().username("username").password("password").build();
        doReturn(null).when(mapValidationErrorService).MapValidationService(any());
        ResponseEntity<?> responseEntity = userController.authenticateUser(loginRequest, bindingResult);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(mapValidationErrorService, times(1)).MapValidationService(any());
    }

    @Test
    void test_login_invalidUser_fail(){
        LoginRequest loginRequest = LoginRequest.builder().username("username").password("password").build();
        doReturn(errorMap).when(mapValidationErrorService).MapValidationService(any());
        ResponseEntity<?> responseEntity = userController.authenticateUser(loginRequest, bindingResult);
        assertNotEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(mapValidationErrorService, times(1)).MapValidationService(any());
    }


    private static Stream<Arguments> validPasswords(){
        return Stream.of(arguments("password", "password"),
                arguments("a different password", "a different password"),
                arguments("validPassword", "validPassword"),
                arguments("123456#$%", "123456#$%"));
    }

    @ParameterizedTest
    @MethodSource("validPasswords")
    void test_register_validPasswordMatch_pass(String password, String confirmPassword){
        User user = User.builder().username("username").password(password).confirmPassword(confirmPassword)
                .givenName("given").surname("sur").build();
        NewUserRequest userRequest = NewUserRequest.builder().user(user).roleCode("ROLE_PUBLIC").build();
        doReturn(user).when(userService).saveUser(any(), any());
        ResponseEntity<?> responseEntity = userController.registerUser(userRequest, bindingResult);
        assertEquals(new ResponseEntity<>(user, HttpStatus.CREATED), responseEntity);
        verify(userService, times(1)).saveUser(any(), any());
    }

    private static Stream<Arguments> invalidPasswords(){
        return Stream.of(arguments("password", "pass"),
                arguments("a different password", "a different"),
                arguments("fail", "fail"),
                arguments("12345", "12345"),
                arguments("", ""));
    }

    @ParameterizedTest
    @MethodSource("invalidPasswords")
    void test_register_invalidPasswordOrPasswordNotMatch_fail(String password, String confirmPassword){
        User user = User.builder().username("username").password(password).confirmPassword(confirmPassword)
                .givenName("given").surname("sur").build();
        NewUserRequest userRequest = NewUserRequest.builder().user(user).roleCode("ROLE_PUBLIC").build();
        ResponseEntity<?> responseEntity = userController.registerUser(userRequest, bindingResult);
        assertNotEquals(new ResponseEntity<>(user, HttpStatus.CREATED), responseEntity);
    }

    @Test
    void test_findUserById_userNotFound_fail(){
        long id = 2;
        User user = User.builder().role(Role.builder().code("ROLE_ADMIN").build()).build();
        doReturn(Optional.ofNullable(null)).when(userService).getUserById(anyLong());
        doReturn(Optional.of(user)).when(userService).getUserByUsername(any());
        ResponseEntity<?> responseEntity = userController.getUserById(id, principal);
        assertEquals(new ResponseEntity<>(format("User Id: {0} not found.", id),
                HttpStatus.NOT_FOUND), responseEntity);
        verify(userService, times(1)).getUserByUsername(any());
        verify(userService, times(1)).getUserById(anyLong());
    }

    private static Stream<String> notShopOwnerRoleCodes(){
        return Stream.of("SHOP",
                "ROLE_PUBLIC",
                "ROLE_ADMIN",
                "ROLE_INVALID",
                "");
    }

    @ParameterizedTest
    @MethodSource("notShopOwnerRoleCodes")
    void test_approveShopOwner_userNotShopOwner_fail(String roleCode){
        Role role = Role.builder().code(roleCode).build();
        User user = User.builder().id((long)1).username("username").password("password").role(role).givenName("given")
                        .surname("sur").build();
        doReturn(Optional.of(user)).when(userService).getUserById(anyLong());
        ResponseEntity<?> responseEntity = userController.approveShopOwner(user.getId());
        assertEquals(new ResponseEntity<>(user, HttpStatus.CONFLICT), responseEntity);
        verify(userService, times(1)).getUserById(anyLong());
    }

    @Test
    void test_approveShopOwner_validShopOwner_pass(){
        Role role = Role.builder().code("ROLE_SHOP").build();
        User user = User.builder().id((long)1).username("username").password("password").role(role).givenName("given")
                .surname("sur").build();
        doReturn(Optional.of(user)).when(userService).getUserById(anyLong());
        doReturn(true).when(userService).isShopOwner(any());
        doReturn(user).when(userService).approveShopOwner(any());
        ResponseEntity<?> responseEntity = userController.approveShopOwner(user.getId());
        assertEquals(new ResponseEntity<>(user, HttpStatus.OK), responseEntity);
        verify(userService, times(1)).getUserById(anyLong());
        verify(userService, times(1)).isShopOwner(any());
        verify(userService, times(1)).approveShopOwner(any());
    }
}
