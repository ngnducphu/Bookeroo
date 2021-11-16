package com.rmit.sept.bk_loginservices.service;

import com.rmit.sept.bk_loginservices.exception.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.repository.RoleRepository;
import com.rmit.sept.bk_loginservices.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser, String roleCode){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)

            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            newUser.setRole(roleRepository.findRoleByCode(roleCode));

            if(roleCode.equals("ROLE_PUBLIC")){
                newUser.setEnabled(true);
            }

            return userRepository.save(newUser);

        }
        catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '" +  newUser.getUsername() + "' already exists");
        }
    }
    
    // user registration to be shop owner required approval from admin.
    public User approveShopOwner(User shopOwner){
        shopOwner.setEnabled(true);
        userRepository.save(shopOwner);
        return shopOwner;
    }

    public boolean isShopOwner(User user){
        return user.getRole().getCode().equals("ROLE_SHOP");
    }

    public Optional<User> getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllPendingShopOwner() {
        List<User> allUser = userRepository.findAll();
        List<User> pendingShopOwners = new ArrayList<User>();
        for (User user: allUser) {
            if (isShopOwner(user) && !user.isEnabled()) {
                pendingShopOwners.add(user);
            }
        }
        return pendingShopOwners;
    }

    public Optional<User> getUserById(long id){
        return userRepository.findById(id);
    }

    // either admin or owner of books is authorised to edit/remove
    public boolean isUserAuthorised(Principal principal, long userId){
        User principalUser = getUserByUsername(principal.getName()).get();
        return principalUser.getRole().getCode().equals("ROLE_ADMIN") || principalUser.getId() == userId;
    }
}
