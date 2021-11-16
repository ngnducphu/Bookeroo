package com.rmit.sept.bk_loginservices.controller;


import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.payload.NewUserRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.service.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.service.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    // post request to register new account.
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NewUserRequest userRequest, BindingResult result){
        User user = userRequest.getUser();
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        if(errorMap != null){
            return errorMap;
        }

        User newUser = userService.saveUser(user, "ROLE_" + userRequest.getRoleCode());
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    // post request for log in
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    // get request to get all users, only available for admin account
    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    // get request to get all pending shop owner users, only available for admin account
    @GetMapping("/pending_shop_owners")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllPendingShopOwner(){
        return ResponseEntity.ok().body(userService.getAllPendingShopOwner());
    }

    // get user's information by id, only available for admin, and the user itself.
    @GetMapping(value = {"ID={id}", "/Id={id}", "/id={id}"})
    public ResponseEntity<?> getUserById(@PathVariable long id, Principal principal){

        User principalUser = userService.getUserByUsername(principal.getName()).get();
        if(!principalUser.getRole().getCode().equals("ROLE_ADMIN") && principalUser.getId() != id){
            return  new ResponseEntity<>("User not authorised to access this endpoint.", HttpStatus.FORBIDDEN);
        }

        Optional<User> user = userService.getUserById(id);

        if(user.isEmpty()){
            return new ResponseEntity<>("User Id: " + id + " not found.", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(user.get());
    }

    // put request to enable account when register as shop owner, available only to admin account
    @PutMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveShopOwner(@PathVariable long id){

        Optional<User> optionalUser = userService.getUserById(id);
        if(optionalUser.isEmpty()){
            return new ResponseEntity<>("User Id: " + id + " not found.", HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();

        if(!userService.isShopOwner(user)){
            return new ResponseEntity<>(user, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(userService.approveShopOwner(user), HttpStatus.OK);
    }
}
