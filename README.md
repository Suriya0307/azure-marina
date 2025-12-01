# 🌊 **Marina — AI Ocean Companion**

**Emotion-Aware • Voice-Interactive • 3D Ocean Environment**

Marina is a next-generation AI companion that blends **emotion detection**, **3D visuals**, and **voice interaction** to create an immersive and calming digital experience.
Built with **Three.js**, **React**, **Face API**, **OpenAI**, **Railway**, and **Netlify**, Marina reacts to your facial expressions in real-time and responds with soothing voice feedback.

---

## 🚀 **Live Demo**

Frontend (Netlify):
🔗 **[https://darling-concha-57de38.netlify.app/app.html](https://darling-concha-57de38.netlify.app/app.html)**

Backend (Railway API):
🔗 **[https://azure-marina-production-5c74.up.railway.app](https://azure-marina-production-5c74.up.railway.app)**

---

## ✨ **Features**

### 🎭 Emotion Detection

Marina uses **Face API** to detect your facial expression in real-time via webcam.
Supported emotions:

* 😊 Happy
* 😔 Sad
* 😡 Angry
* 😌 Calm

Each emotion dynamically changes the **ocean, skybox, and lighting**.

---

### 🌅 Dynamic 3D Ocean Environment

Powered by **Three.js**, the environment simulates:

* Animated realistic waves
* Emotion-based skybox textures
* Light transitions
* Smooth camera movement

---

### 🎤 Voice Interaction

Marina listens to your voice and responds in a calm, friendly manner.

Two modes supported:

* **Text → Voice via ElevenLabs** (production)
* **Browser Speech Synthesis** fallback (local / no API)

---

### 💬 AI Assistant

Connected with **OpenAI GPT-4o-mini**, Marina can:

* Answer questions
* Provide emotional support
* Hold short calming conversations

---

## 🧠 **Tech Stack**

### **Frontend**

* React + Vite
* Three.js
* Face-API.js
* Web Speech API (fallback)
* Netlify (hosting)

### **Backend**

* Node.js + Express
* OpenAI Chat API
* ElevenLabs Text-to-Speech API
* Railway (hosting)

---

## ⚙️ **Project Structure**

```
marinaocean/
│
├── public/
│   ├── models/ (face detection models)
│   ├── assets/ (skyboxes, textures)
│   └── waves.mp3
│
├── src/
│   ├── components/
│   ├── ai/
│   │   ├── chat.js     (OpenAI request)
│   │   └── voice.js    (TTS request)
│   ├── emotion/
│   │   └── emotionDetector.js
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   └── server.js
│
├── index.html          (landing page)
├── app.html            (main 3D app)
└── vite.config.js
```

---

## 📝 **Backend Endpoints**

### `POST /api/chat`

Input:

```json
{
  "userText": "Hello Marina"
}
```

Output:

```json
{
  "reply": "Hello, gentle soul. How may I assist you today?"
}
```

---

### `POST /api/voice`

Input:

```json
{
  "text": "Hello from Marina"
}
```

Output:
`audio/mpeg` buffer (MP3 file)

---

## 🛠️ **How to Run Locally**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/azure-marina.git
cd azure-marina
```

### 2️⃣ Install frontend packages

```bash
npm install
```

### 3️⃣ Install backend packages

```bash
cd server
npm install
```

### 4️⃣ Add your `.env` files

Frontend (`/.env`)

```
VITE_OPENAI_KEY=
VITE_ELEVEN_KEY=
```

Backend (`/server/.env`)

```
OPENAI_API_KEY=
ELEVEN_API_KEY=
```

### 5️⃣ Run backend

```bash
cd server
node server.js
```

### 6️⃣ Run frontend

```bash
npm run dev
```

---

## 🌐 **Deployment**

### Frontend

Hosted on **Netlify**:

* `npm run build`
* Upload **dist/** folder to Netlify Drop

### Backend

Deployed on **Railway**:

* Connect GitHub repo
* Add environment variables
* Deploy service
* Use generated URL in frontend (`/api/chat`, `/api/voice`)

---

## 🏆 **Use-Case**

Marina is designed for:

* Mental wellness applications
* Calming digital experiences
* Interactive installations
* Immersive art projects
* Human–AI emotional interaction research

---

## 📸 **Screenshots**

**Landing Page**
🌊 Minimal, modern introduction screen

**Emotion Detection**
📷 Real-time webcam bounding box + emotion label

**3D Ocean Scene**
🌅 Dynamic lighting + ocean shaders + skyboxes

**Chat + Voice**
🎤 Smooth voice input → AI response → voice output

---

## 🙏 **Acknowledgements**

* OpenAI for GPT-4o-mini
* ElevenLabs for voice synthesis
* Face API for emotion detection
* Three.js for the 3D environment
* Netlify + Railway for free hosting

---

## ⭐ **If you like this project, don't forget to star the repo!**

Your support motivates further development.

---


