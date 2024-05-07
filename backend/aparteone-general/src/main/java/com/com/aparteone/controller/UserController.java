package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.auth.UserResponse;
import com.com.aparteone.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/detail")
    public ResponseEntity<UserResponse> getUserDetail(@RequestParam Integer userId) throws Exception {
        log.info("[User] Get User Detail: userId-{}", userId);
        return ResponseEntity.ok(userService.getUserById(userId));
    }
}
