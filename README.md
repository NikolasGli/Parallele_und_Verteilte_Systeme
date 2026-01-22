# Parallele_und_Verteilte_Systeme
# Cloud Native Todo Frontend

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-3.0-green)

Ein modernes, containerisiertes Frontend für die Verwaltung von Aufgaben (Todos). Entwickelt im Rahmen der Vorlesung **Parallele und Verteilte Systeme** (HS Esslingen, WS25/26).

Dieses Projekt stellt die Benutzeroberfläche (UI) bereit, die mit einem vorgegebenen Spring Boot Backend kommuniziert.

---

### Funktionalität

| Feature | Status | Anmerkung |
| :--- | :---: | :--- |
| **Todos anzeigen** | ✅ | Lädt Liste vom Backend |
| **Todo erstellen** | ✅ | `POST` Request an API |
| **Todo löschen** | ✅ | `DELETE` Request an API |

> **Hinweis:** Die Funktionen zum Bearbeiten und Status-Ändern sind im UI aktuell ausgeblendet.

---

## Architektur

Das Frontend wird als **Single Page Application (SPA)** ausgeliefert.
* Im **Entwicklungsmodus** (Lokal) nutzt es den Vite Dev Server.
* Im **Produktionsmodus** (Docker) läuft es auf einem **Nginx Webserver**.

```mermaid
graph LR
    User((User)) -- Port 80 --> Nginx[Frontend Container<br>Nginx]
    Nginx -- /todos --> Backend[Backend Container<br>Spring Boot]
    Nginx -- / --> VueApp[Vue.js Static Files]
