
# **MARINA — A Dreamlike Ocean That Feels Your Emotions and Speaks Back**

**Emotion Detection • Voice Interaction • Immersive 3D Ocean Scene**
**Real-Time Facial AI • GPT-4o-Mini • Three.js Simulation**

<div align="center">
  <img src="https://img.shields.io/badge/Real--Time-Emotion%20Detection-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/3D%20Graphics-Three.js-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI%20Assistant-GPT--4o--Mini-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Voice%20Output-ElevenLabs-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge" />
</div>

---

## 📚 Table of Contents

* [Demo](#demo)
* [Who Is It For?](#who-is-it-for)
* [Core Features](#core-features)
* [Live Emotion-to-Environment Mapping](#live-emotion-to-environment-mapping)
* [Architecture Overview](#architecture-overview)
* [Processing Pipeline](#processing-pipeline)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Running the Project](#running-the-project)
* [Deployment](#deployment)
* [Use Cases](#use-cases)
* [Screenshots](#screenshots)
* [Why Marina?](#why-marina)


---

## 🚀 Demo

Live Demo:
🔗 **[https://speakwithmarina.netlify.app/app.html](https://speakwithmarina.netlify.app/app.html)** 

> **Dive into marina now**:
> Enable webcam → Hold the mic and Speak to Marina → Watch the ocean respond to your emotions.


---

## 🧑‍🤝‍🧑 Who Is It For?

* **Students exploring AI + 3D graphics**
* **Mental wellness creators** building calming digital therapists
* **Game & AR developers** experimenting with emotion-driven environments
* **Anyone who wants to merge AI, emotions, sound, and visuals**

---

## 🌟 Core Features

| Feature                        | Description                                |
| ------------------------------ | ------------------------------------------ |
| **Emotion Detection**          | Real-time face tracking using Face-API.js  |
| **3D Ocean Simulation**        | Dynamic waves + skyboxes using Three.js    |
| **Emotion-Driven Environment** | Sky, water, lighting adapt to how you feel |
| **AI Conversations**           | Powered by GPT-4o-mini                     |
| **Calming Voice Output**       | ElevenLabs TTS or Web Speech fallback      |
| **Two-Page Experience**        | Landing page → immersive ocean world       |

---

## 🎭 Live Emotion-to-Environment Mapping

| Emotion         | Ocean Color | Skybox       | Lighting       | Tone of Marina      |
| --------------- | ----------- | ------------ | -------------- | ------------------- |
| 😊 Happy        | Bright blue | Warm sunrise | Soft bloom     | Cheerful, uplifting |
| 😔 Sad          | Dark navy   | Cloudy       | Low contrast   | Gentle, comforting  |
| 😡 Angry        | Deep red    | Stormy       | High contrast  | Calm, grounding     |
| 😌 Neutral/Calm | Turquoise   | Clear sky    | Balanced light | Peaceful + warm     |

> **Your face becomes the controller of the world.**

---

## 🏗 Architecture Overview

```
Frontend (React + Three.js)
      |
      ├── Emotion Detector (Face-API)
      ├── Voice Input (Web Speech / Button)
      ├── Ocean Renderer (Three.js)
      └── API Client → /api/chat + /api/voice
                               |
                               v
Backend (Node.js + Express)
      ├── OpenAI GPT-4o-mini (Chat)
      └── ElevenLabs (TTS)
```

Everything runs in real-time with smooth interaction loops.

---

## 🔧 Processing Pipeline

### 🎭 Emotion Flow

1. Webcam captures face
2. Face-API detects expression
3. Emotion value mapped to environment
4. Three.js updates sky + ocean shaders

### 💬 Chat Flow

1. User speaks or types
2. Frontend sends text → `/api/chat`
3. GPT-4o-mini generates response
4. Response returned to frontend

### 🔊 Voice Output

1. Frontend sends Marina’s reply → `/api/voice`
2. ElevenLabs returns MP3
3. Browser plays voice

---

## 🧪 Tech Stack

### Frontend

* React + Vite
* Three.js (Ocean + Skybox)
* Face-API.js (Emotion detection)
* Web Speech API (fallback voice)
* Netlify hosting

### Backend

* Node.js + Express
* OpenAI API (GPT-4o-mini)
* ElevenLabs TTS
* Railway hosting

---

## ⚙ Installation

```bash
git clone https://github.com/YOUR-USERNAME/azure-marina.git
cd azure-marina
npm install
cd server
npm install
```

### Environment Variables

Frontend `.env`

```
VITE_OPENAI_KEY=
VITE_ELEVEN_KEY=
```

Backend `server/.env`

```
OPENAI_API_KEY=
ELEVEN_API_KEY=
```

---

## ▶ Running the Project

Start backend:

```bash
cd server
node server.js
```

Start frontend:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend — Netlify

```bash
npm run build
```

Upload `dist/` to Netlify Drop.

### Backend — Railway

* Connect repo
* Set environment variables
* Deploy
* Use the Railway URL in frontend `/api/chat` + `/api/voice`

---

## 🎥 Use Cases

* Real-time emotional wellness tools
* Interactive AI art installations
* AI-powered meditation experiences
* Ambient digital storytelling
* Emotion-aware games / NPCs
* Ed-Tech: teaching AI + graphics together
* Hackathon demo projects

---

## 🖼 Screenshots

### Landing Page



<img width="1920" height="1140" alt="Screenshot 2025-12-02 121307" src="https://github.com/user-attachments/assets/22883b75-10b4-4197-9e36-3bf957881067" />



*A calm portal to the ocean world.*

### Real-Time Emotion Detection


### Calm


<img width="1920" height="1140" alt="Screenshot 2025-12-02 121618" src="https://github.com/user-attachments/assets/4ee7c4c8-5182-44e5-a0f5-42ac5b79796e" />



###  Happy



<img width="1920" height="1140" alt="Screenshot 2025-12-02 121437" src="https://github.com/user-attachments/assets/42c4d86e-88d9-48bd-a59c-e168b6598a2e" />



### Sad


<img width="1920" height="1140" alt="Screenshot 2025-12-02 121936" src="https://github.com/user-attachments/assets/fb45ef1e-3743-4eef-b310-72bdaec210bf" />



## Angry


<img width="1920" height="1140" alt="Screenshot 2025-12-02 122325" src="https://github.com/user-attachments/assets/58ac0ee1-b19b-4a1f-b1fe-6eb0d9450c44" />




Dynamic waves + sky reflections.

### AI + Voice Interaction



<img width="1920" height="1140" alt="Screenshot 2025-12-02 122633" src="https://github.com/user-attachments/assets/992e221d-cac1-4403-97d4-1cde6c42f343" />




GPT-powered responses → voice output.

---

## 💙 Why Marina?

> “We didn’t just simulate an ocean —
> we simulated how the ocean reacts to **you**.”

Marina is built to show what happens when you combine:

* Emotion AI
* 3D graphics
* Voice synthesis
* Real-time interaction
* Human feelings







  

<p align="center" style="font-size:20px; color:#2EA3F2;">
  <i><b>“When I was young, the ocean felt alive to me. With Marina, I’ve finally built the ocean that speaks back.”</b></i>
</p>


---
