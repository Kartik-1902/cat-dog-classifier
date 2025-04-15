# 🐾 Cat vs Dog Classifier

This project is a React-based web application that allows users to upload an image and classify it as either a **Cat** or a **Dog** using three different machine learning models: **CNN**, **ANN**, and **ResNet50**.

> 🧠 The backend runs trained models to predict results, while the frontend presents an intuitive interface for users to upload and view predictions.

---

## 🚀 Features

- Drag and drop image upload interface
- Real-time classification results from three ML models
- Loading indicators and confidence bars
- Responsive UI built with Tailwind CSS
- Clean separation of frontend and backend

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python (TensorFlow/FastAPI)
- **Communication:** Axios (REST API)
- **Model Types:** CNN, ANN, ResNet50

---

## 📦 Installation

### 1. Clone this Repository

```bash
git clone https://github.com/your-username/cat-dog-classifier-frontend.git
cd cat-dog-classifier-frontend
```
install dependecies 
```bash
npm install
```
In .env-local
```bash
VITE_API_BASE_URL=http://<your-backend-ip>:8000
```
🔗 Backend Setup
Due to resource constraints (such as limited RAM on free-tier hosting platforms like Render), the backend is not deployed publicly.

However, you can run it locally using the following repository:
👉 https://github.com/bismuth01/cat-dog-classifier-api
