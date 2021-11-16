package com.rmit.sept.bk_loginservices.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.Collection;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank(message = "Password field is required")
    @Column(nullable = false)
    private String password;

    @Transient
    private String confirmPassword;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @JsonIgnore
    @Transient
    private String fullName;

    @NotBlank(message = "Please enter your given name")
    @Column(nullable = false)
    private String givenName;

    @NotBlank(message = "Please enter your surname")
    @Column(nullable = false)
    private String surname;

    private String address;

    @NumberFormat
    private String phoneNumber;

    @NumberFormat
    private String abn;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    @URL
    private String imageUrl;

    private boolean enabled;

    @PrePersist
    protected void onCreate(){
        this.createDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updateDate = LocalDateTime.now();
    }

    public String getFullName() {
        return MessageFormat.format("{0} {1}", givenName, surname);
    }

    /*
    UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }
}