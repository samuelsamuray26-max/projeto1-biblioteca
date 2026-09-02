# Sistema de Biblioteca

## Como rodar

### Banco de dados (Postgres via Docker)
```
cd backend
docker compose up -d
```

### Backend (Spring Boot + Gradle + Java 25)
```
cd backend
./gradlew bootRun
```
(ou importe a pasta `backend` como projeto Gradle na sua IDE e rode a classe `BibliotecaApplication`)

A API sobe em `http://localhost:8080`.

### Frontend (React + Vite)
```
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Atividade

Este sistema tem bugs propositais no backend e no frontend, além de pontos que podem
ser melhorados (boas práticas, validações, tratamento de erro, etc). Naveguem pelas telas,
testem os fluxos (cadastrar livro, emprestar, devolver) e façam uma lista do que encontrarem.
