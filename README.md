# 📰 Fake News Detector

Fake News Detector is a full-stack Machine Learning web application that predicts whether a news headline looks **Fake 🔴** or **Real 🟢** — in seconds.

It combines a trained ML model, a Flask API, and a React frontend, all deployed on modern cloud platforms.

---

## 🔗 Live Demo

- 🌐 **Frontend (React UI):** https://fake-news-detection-using-ml-and-nlp.vercel.app/  
- ⚙️ **Backend (Flask API):** https://fake-news-detection-using-ml-and-nlp.onrender.com  

---

## 🧩 Tech & Tools

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-black?logo=flask)
![Python](https://img.shields.io/badge/Language-Python-3776AB?logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?logo=scikitlearn&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosting-Vercel-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/API-Render-46E3B7?logo=render&logoColor=white)

---

## 🎨 Banner

You can keep a simple banner image at the top of the repo (optional):

`assets/banner.png`

For example, a banner that says:

> **Fake News Detector** – ML-powered news headline checker

(Add the image to the repo later and reference it like this in Markdown:)

`![Fake News Detector Banner](assets/banner.png)`

---

## 🚀 Features

- 🔍 **Fake vs Real classification** using a trained ML model  
- ⚡ **Instant predictions** (model loaded in memory on the server)  
- 🖥️ **Clean, responsive UI** that works on desktop & mobile  
- 🧪 **Sample fake/real headlines** to play with inside the app  
- 🔒 **No login, no storage** – user text is not saved  

---

## 🎯 How It Works (User View)

1. Type or paste any news headline or short snippet.  
2. Click **“Detect Fake News”**.  
3. The app responds with **Fake 🔴** or **Real 🟢**.  
4. You can tweak the text and try different variations.

> This is a **pattern-based prediction**, not an official fact checker.  
> It should be treated as a **second opinion**, not as proof.

---

## 🧠 Machine Learning Overview

Internally, the app uses a classic **text classification** pipeline:

| Step | What Happens |
|------|--------------|
| 1️⃣ Preprocessing | Text is cleaned and lowercased |
| 2️⃣ Vectorization | Text is converted into numbers using **TF-IDF** |
| 3️⃣ Classification | A **Multinomial Naive Bayes** model predicts Fake/Real |
| 4️⃣ Response | Flask API returns JSON with the prediction to the React UI |

The model and vectorizer are stored as:

- `model.pkl` – trained classifier  
- `tfidf.pkl` – TF-IDF vectorizer  

---

## 🛠 Tech Stack (Summary)

| Layer      | Technology                            |
|-----------|----------------------------------------|
| Frontend  | React.js, CSS                          |
| Backend   | Flask (Python)                         |
| ML Model  | scikit-learn (TF-IDF + Naive Bayes)    |
| Hosting   | Vercel (Frontend), Render (Backend)    |

---

## 📂 Project Structure

    Fake-News-Detector/
      ├─ frontend/         # React UI
      │   ├─ src/          # Components, styles, logic
      │   └─ public/       # index.html, icons, static assets
      ├─ backend/          # Flask API + ML loading
      │   ├─ app.py        # Main API entrypoint
      │   ├─ model.pkl     # Trained ML model
      │   └─ tfidf.pkl     # TF-IDF vectorizer
      └─ README.md         # Project documentation

*(your actual filenames like `api.py`/`app.py` may differ – adjust if needed)*

---

## 📸 Screenshots (Placeholders)

Add these images later inside an `assets/` folder and update paths:

1. **Home Detector Screen**  
   `assets/home-screen.png`  
   _Shows the text box, Detect button, and result panel._

2. **Fake Result Example (🔴)**  
   `assets/fake-result.png`  
   _Example of a clearly fake headline detected as Fake._

3. **Real Result Example (🟢)**  
   `assets/real-result.png`  
   _Example of a normal headline detected as Real._

You can embed them like:

- `![Home Screen](assets/home-screen.png)`  
- `![Fake Result](assets/fake-result.png)`  
- `![Real Result](assets/real-result.png)`  

---

## ⚙️ High-Level Flow

    User Types Text
          ↓
    React Frontend (Vercel) 
          ↓  POST /predict
    Flask API (Render)
          ↓
    TF-IDF + Naive Bayes Model
          ↓
    JSON Response → UI highlights Fake/Real

---

## ⚡ Why This Project

- To have a **real deployed ML app**, not just a notebook.  
- To combine **frontend + backend + ML** in one clean project.  
- To create a **portfolio-ready** fake news detection demo.  

---

## 👨‍💻 Developer

**Sanjay Kumar**  

Enthusiast in:

- 🔹 Machine Learning  
- 🔹 Python & Flask  
- 🔹 React & modern web apps  

> “Don’t trust every headline you see.  
> Check it. Question it. Think twice.”  

---

## ⭐ Support

If you like **Fake News Detector**:

- 🌟 Star this repository  
- 🧪 Try different crazy / viral headlines  
- 🗣️ Share feedback or ideas for improvements  

---

Thanks for checking out **Fake News Detector**! 📰✨  
Stay curious. Stay informed. Stay critical.
