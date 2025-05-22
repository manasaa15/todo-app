package com.todoapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String task;
    
    public String getTask() {
        return task;
    }

    // Add this setter explicitly if needed
    public void setTask(String task) {
        this.task = task;
    }
}
