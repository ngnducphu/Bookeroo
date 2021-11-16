package com.rmit.sept.bk_loginservices.repository;

import com.rmit.sept.bk_loginservices.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findRoleByCode(String code);
}
