package com.com.aparteone.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.entity.audit.AuditEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@EqualsAndHashCode(callSuper = false)
public class User extends AuditEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer roleId;
    private String email;
    private String phone;
    private String password;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.roleId == AparteoneConstant.ROLE_ID_ADMIN)
            return List.of(new SimpleGrantedAuthority(AparteoneConstant.ROLE_ADMIN));
        else if(this.roleId == AparteoneConstant.ROLE_ID_MANAGEMENT)
            return List.of(new SimpleGrantedAuthority(AparteoneConstant.ROLE_MANAGEMENT));
        else if(this.roleId == AparteoneConstant.ROLE_ID_RESIDENT)
            return List.of(new SimpleGrantedAuthority(AparteoneConstant.ROLE_RESIDENT));
        else if(this.roleId == AparteoneConstant.ROLE_ID_MERCHANT)
            return List.of(new SimpleGrantedAuthority(AparteoneConstant.ROLE_MERCHANT));
        else return null;
    }

    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}