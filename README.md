# 🚆 RailEase - Modern Train Booking System

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> **RailEase** is a state-of-the-art train booking application designed to provide a seamless, intuitive, and premium user experience. Built with the robust MERN stack, it features real-time seat availability, waitlist management, and secure booking flows.

---

## 🌟 Key Features

-   **🔍 Smart Search**: Advanced train search with fuzzy matching for station names (e.g., "Delhi" matches "Old Delhi", "New Delhi").
-   **🎫 Real-Time Availability**: View seat counts for multiple classes (1A, 2A, 3A, SL) instantly.
-   **⏳ Waitlist System**: Intelligent waitlisting allows users to book tickets even when seats are full, with a distinct status tracking system.
-   **💳 Secure Booking Flow**: Simulated payment gateway with transaction ID generation and validation.
-   **📱 Responsive Design**: A beautiful, glassmorphism-inspired UI that works perfectly on desktop and mobile.
-   **👤 User Dashboard**: Manage bookings, view ticket status (Confirmed/Waitlisted), and cancel tickets with ease.
-   **🛡️ Admin Panel**: Comprehensive dashboard for managing trains, routes, and viewing all system bookings.

---

## 🛠️ Tech Stack

### **Frontend**
-   **Framework**: [React.js](https://reactjs.org/) (Vite)
-   **Styling**: Tailwind CSS, Framer Motion (for animations)
-   **Icons**: Lucide React
-   **State Management**: React Context API
-   **Routing**: React Router DOM

### **Backend**
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### **Prerequisites**
-   Node.js (v14 or higher)
-   MongoDB (Local or Atlas)
-   Git

### **Installation**

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/railease.git
    cd railease
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    *Create a `.env` file in the `backend` directory:*
    ```env
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/railease
    JWT_SECRET=your_super_secret_key_123
    ```
    *Seed the Database (Optional but recommended):*
    ```bash
    node seedRealData.js
    ```
    *Start the Server:*
    ```bash
    npm run dev
    ```

3.  **Setup Frontend**
    *Open a new terminal:*
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App**
    -   Frontend: `http://localhost:5173`
    -   Backend API: `http://localhost:5001`

---

## 📸 Screenshots

| Home Page | Search Results |
|:---:|:---:|
| *Landing page with search widget* | *Train list with availability & pricing* |

| My Bookings | Admin Dashboard |
|:---:|:---:|
| *User tickets with status badges* | *System management interface* |

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/trains/search` | Search for trains between stations |
| `POST` | `/api/users/login` | Authenticate user & get token |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings/mybookings` | Get logged-in user's bookings |
| `DELETE` | `/api/bookings/:id` | Cancel a booking |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by Gunit Chawla</p>
</div>
