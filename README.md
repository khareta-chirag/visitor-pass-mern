# Visitor Pass Management System (MERN Stack)

This is a Visitor Pass Management System developed using the MERN stack
(MongoDB, Express.js, React.js, Node.js) as part of Assignment 9.

The system allows visitors to register, employees to approve visits,
and security to verify visitors using QR code scanning.

---

## 🚀 Features

### 👤 Visitor Module
- Visitor registration form
- Upload visitor photo
- Submit visit request

### 👨‍💼 Employee Module
- View pending visitor requests
- Approve visitor appointments
- Generate QR code pass after approval

### 🛡️ Security Module
- Scan QR code using camera or image upload
- Verify visitor entry

---

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- File Upload: Multer
- QR Code Generation: qrcode
- QR Scanner: html5-qrcode

---


### Backend Setup
```bash
cd backend
npm install
npm run dev


### Frontend Setup
```bash
cd frontend
npm install
npm start
