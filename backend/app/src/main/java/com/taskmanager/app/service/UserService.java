package com.taskmanager.app.service;

import com.taskmanager.app.model.User;
import com.taskmanager.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use!");
        }
        // Hash the password before saving to the MySQL database
        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(email, hashedPassword);
        return userRepository.save(newUser);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}