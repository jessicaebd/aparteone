package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.User;

public class UserSpecification {
    public static Specification<User> isNotAdmin() {
        return (root, query, builer) -> builer.notEqual(root.get("roleId"), 1);
    }

    public static Specification<User> hasRoleId(Integer roleId) {
        return (root, query, builer) -> builer.equal(root.get("roleId"), roleId);
    }
}
