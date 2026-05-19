package com.taskmanager.app.controller;

import com.taskmanager.app.model.AuthRequest;
import com.taskmanager.app.model.User;
import com.taskmanager.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            User user = userService.registerUser(request.getEmail(), request.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return userService.loginUser(request.getEmail(), request.getPassword())
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok().body(user)) 
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password."));
    }
}