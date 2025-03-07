# 1WebBackLab

## 📌 Описание

1WebBackLab — это серверная часть веб-приложения, разработанная на **Node.js** с использованием **Express** и **MongoDB**. Проект предоставляет API для управления пользователями и данными, аутентификации и авторизации.

---

## ⚙️ Технологии

- **Node.js** — среда выполнения JavaScript
- **Express.js** — веб-фреймворк для Node.js
- **MongoDB** — NoSQL база данных
- **Yarn** — менеджер пакетов
- **Mongoose** — ODM для работы с MongoDB
- **JWT (JSON Web Token)** — механизм аутентификации

---

## 🚀 Запуск проекта

### 1️⃣ Установка зависимостей

Перед установкой убедитесь, что у вас установлены:

- [Node.js](https://nodejs.org/) (LTS-версия)
- [Yarn](https://yarnpkg.com/) (устанавливается через `npm install -g yarn`)
- [MongoDB](https://www.mongodb.com/) (локально или в облаке)

После этого выполните:

```bash
git clone https://github.com/DanilGefest/1WebBackLab.git
cd 1WebBackLab
yarn install
```

### 2️⃣ Настройка переменных окружения

Создайте файл `.env` в корневой директории и добавьте в него:

```ini
MONGO_URI=mongodb://localhost:27017/your_database_name
PORT=3000
JWT_SECRET=your_secret_key
```

### 3️⃣ Запуск сервера

Для запуска в обычном режиме:

```bash
yarn start
```

Для запуска в режиме разработки (с автоматической перезагрузкой через nodemon):

```bash
yarn run dev
```

После запуска сервер будет доступен по адресу [http://localhost:3000](http://localhost:3000).

---

## 📡 API эндпоинты

### 🔹 Регистрация

- **POST** `api/users/register/student` — Создать нового студента
- **POST** `api/users/register/teacher` — Создать нового преподавателя
  - **Тело запроса (JSON):**
    ```json
    {
      "name": "Имя",
      "lastname": "Фамилия",
      "email": "example@email.com",
      "password": "секретный_пароль"
    }
    ```

### 🔹 Аутентификация

- **POST** `api/users/login` — Авторизация пользователя
  - **Тело запроса (JSON):**
    ```json
    {
      "email": "example@email.com",
      "password": "секретный_пароль"
    }
    ```
  - **Ответ:**
    ```json
    {
      "token": "jwt-токен"
    }
    ```

### 🔹 Данные

- **GET** `api/users/info` — Получить данные пользователя по ID
  - Header запроса
``` authToken: jwt-токен ```
  - **Тело запроса (JSON):**
    ```json
    {
      "id": "id пользователя"
    }
    ```
    
- **DELETE** `api/users` — Удалить пользователя
  - Header запроса
``` authToken: jwt-токен ```
  - **Тело запроса (JSON):**
    ```json
    {
      "id": "id пользователя"
    }
    ```

---

## 🛠 Разработка

Для запуска сервера в режиме разработки используйте:

```bash
yarn dev
```

---

## 📜 Лицензия

Этот проект распространяется под лицензией **MIT**.

