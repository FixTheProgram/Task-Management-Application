package com.taskmanager.app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data // Generates getters and setters
@NoArgsConstructor
@Table(name = "tasks")
@EntityListeners(org.springframework.data.jpa.domain.support.AuditingEntityListener.class)
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.TODO;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    @org.springframework.data.annotation.CreatedDate // Automatically sets timestamp on creation
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @org.springframework.data.annotation.LastModifiedDate // Automatically updates timestamp on changes
    private java.time.LocalDateTime updatedAt;

    

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public java.time.LocalDateTime getCreatedAt() { return createdAt; }
    public java.time.LocalDateTime getUpdatedAt() { return updatedAt; }
}