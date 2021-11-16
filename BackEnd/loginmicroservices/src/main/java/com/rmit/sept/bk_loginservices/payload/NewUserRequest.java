package com.rmit.sept.bk_loginservices.payload;

import com.rmit.sept.bk_loginservices.model.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
public class NewUserRequest {

    private User user;

    @NotBlank(message = "Please enter a role code")
    private String roleCode;

}
