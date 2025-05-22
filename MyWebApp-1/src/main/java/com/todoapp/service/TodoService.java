package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> getAll() {
        return repo.findAll();
    }

    public Todo save(Todo todo) {
        return repo.save(todo);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
