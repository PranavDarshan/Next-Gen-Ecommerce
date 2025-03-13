# Next-Gen E-Commerce

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Next-Gen E-Commerce** is a **full-stack e-commerce platform** leveraging **React.js** for the frontend and **Spring Boot (Java)** for the backend. The project integrates **LLama Vision technology** to enhance product recognition and optimize inventory management. With **NoSQL and SQL databases**, it provides a scalable and efficient architecture.

## Features

✅ **User Authentication** – Secure JWT-based login & registration  
✅ **Product Management** – CRUD operations for products  
✅ **Shopping Cart** – Real-time cart functionality  
✅ **Order Processing** – Seamless checkout with payment gateway  
✅ **AI-Powered Search** – LLama Vision-based product search  
✅ **Inventory Management** – Real-time stock tracking  
✅ **Admin Dashboard** – Manage users, products, and orders  
✅ **RESTful API** – Secure and optimized backend services  

## Tech Stack

### 🔹 **Frontend**: 
- React.js (Vite)
- Tailwind CSS (UI Styling)
- Fetch API (For API calls)

### 🔹 **Backend**:
- Java + Spring Boot
- Spring Security (Authentication & Authorization)
- RESTful APIs (Spring MVC)
- JPA (Database interactions)

### 🔹 **Database**:
- MySQL (Relational Data)

## Installation

### Prerequisites:
- **Node.js** (v16+)
- **Java** (JDK 17+)
- **MySQL**

### 🛠 Backend (Spring Boot)

The backend runs on **port 8080**, and you can test the API endpoints using **Postman** or any other API testing tool.

1. Clone the repository:
   ```sh
   git clone https://github.com/PranavDarshan/Next-Gen-Ecommerce.git
   cd Next-Gen-Ecommerce/backend
   ```

2. Set up the database:  
   - **MySQL**: Create a database named `ecom`
   - The `mysql` folder contains the SQL queries required to generate the necessary tables for the application to function properly. Make sure to execute these queries in your MySQL database before running the backend.

3. Configure `application.properties`:
   ```properties
   spring.application.name=prodBackend
   
   # MySQL Connection
   spring.datasource.url=jdbc:mysql://localhost:3306/ecom
   spring.datasource.username=root
   spring.datasource.password=admin
   
   spring.mvc.async.request-timeout=PT10M
   ```

4. Run the backend:
   ```sh
   mvn spring-boot:run
   ```

### ⚡ Frontend (React)
1. Navigate to the frontend:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the frontend server:
   ```sh
   npm run dev
   ```

4. Open **`http://localhost:3000`** in your browser.

## Usage

1. **User** registers and logs in.
2. Browse **products** and add them to the **cart**.
3. **Checkout** securely via Stripe.
4. **Admins** manage orders, users, and inventory.

## API Endpoints

All endpoints run on **http://localhost:8080**


| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/api/product`               | Add a new product               |
| POST   | `/api/staff/login`           | Staff login authentication      |
| POST   | `/api/scan`                  | Scan product from an image      |
| POST   | `/api/upload`                | Upload two product images       |
| POST   | `/api/update-stock`          | Update product stock            |
| POST   | `/api/billing`               | Create a transaction (billing)  |
| POST   | `/api/login`                 | User login authentication       |

## Contributing

### Contributors

Thank you to the following people who have contributed to this project:

- **Pranav Darshan** - [@PranavDarshan](https://github.com/PranavDarshan)
- **Raghuveer Rajesh** - [@Raghoeveer](https://github.com/Raghoeveer)


Want to improve this project? Follow these steps:

1. **Fork** the repository.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```sh
   git commit -m "Add new feature"
   ```
4. **Push to GitHub**:
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request (PR)**.

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Pranav Darshan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contact

📧 **Pranav Darshan**  
GitHub: [@PranavDarshan](https://github.com/PranavDarshan)  
