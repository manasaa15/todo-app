# 📝 Todo Summary Assistant

A full-stack ToDo application where users can:
- Create, view, and delete personal to-do items.
- Click a button to summarize all pending to-dos using **OpenAI's GPT model**.
- Automatically send that summary to a **Slack channel** via webhook.

---

## 🚀 Features

- ✅ Add, view, and delete todos
- ✅ Summarize current todos using OpenAI's GPT API
- ✅ Send summary directly to Slack using Incoming Webhooks
- ✅ React frontend + Spring Boot backend + PostgreSQL database

---

## 🧰 Tech Stack

| Frontend     | Backend     | Database   | APIs         |
|--------------|-------------|------------|--------------|
| React        | Spring Boot | PostgreSQL | OpenAI, Slack |

---

## 📁 Project Structure

todo-summary-assistant/
├── backend/ # Spring Boot backend
│ └── src/main/java/... (controller, model, service)
│ └── src/main/resources/application.properties
├── frontend/ # React frontend
│ └── src/components/TodoList.jsx
│ └── src/App.js
└── README.md


---

## ⚙️ Environment Variables

Create a file named `.env` or set these directly in `application.properties` for Spring Boot:

```properties
# backend/src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update

openai.api.key=YOUR_OPENAI_API_KEY
slack.webhook.url=YOUR_SLACK_WEBHOOK_URL


