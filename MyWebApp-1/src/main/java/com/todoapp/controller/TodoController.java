package com.todoapp.controller;

import com.todoapp.model.Todo;
import com.todoapp.service.TodoService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService service;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.api.key}")
    private String openAiKey;

    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping("/todos")
    public List<Todo> getTodos() {
        return service.getAll();
    }

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        return service.save(todo);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeAndSend() {
        List<Todo> todos = service.getAll();
        // Create prompt by joining all tasks into a comma separated string
        String prompt = "Summarize these todos: " + todos.stream()
                                .map(Todo::getTask)
                                .collect(Collectors.joining(", "));

        String response = callOpenAI(prompt);
        sendToSlack(response);
        return ResponseEntity.ok("Sent to Slack: " + response);
    }

    private String callOpenAI(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiKey);

        String body = """
            {
              "model": "gpt-3.5-turbo",
              "messages": [{"role": "user", "content": "%s"}]
            }
        """.formatted(prompt);

        HttpEntity<String> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://api.openai.com/v1/chat/completions", request, String.class);
        return response.getBody();
    }

    private void sendToSlack(String summary) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"text\": \"%s\"}".formatted(summary);
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        restTemplate.postForEntity(slackWebhookUrl, request, String.class);
    }
}
