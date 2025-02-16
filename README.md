# City Itinerary Generator

\
**Plan your perfect adventure with our AI-powered seasonal itinerary generator!**

## 🚀 Overview

The **City Itinerary Generator** is a React-based web app that generates a customized travel itinerary based on:

- Your chosen **destination**
- Your **travel dates** (used to determine season and local events)
- AI-powered recommendations using **Groq LLM**

## ✨ Features

✅ **Dynamic Itineraries** - AI generates a highly specific itinerary for your trip.\
✅ **Season-Aware Planning** - Weather, events, and cultural nuances are considered.\
✅ **Multi-Day Support** - Plan trips up to **14 days** long.\
✅ **Date Selection UI** - Easily choose trip dates using `react-datepicker`.\
✅ **Live Loading & Feedback** - Get real-time responses with `react-hot-toast`.\
✅ **Beautiful UI** - Styled with TailwindCSS for a modern, responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Groq LLM (for itinerary generation)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **UI Components:** `react-datepicker`, `lucide-react` icons
- **Toasts & Notifications:** `react-hot-toast`

---

## 📂 Project Structure

```
📦 city-itinerary-generator
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 DaySchedule.tsx     # Displays itinerary for each day
 ┃ ┣ 📂 lib
 ┃ ┃ ┣ 📜 groq.ts           # Handles AI itinerary generation
 ┃ ┃ ┣ 📜 seasons.ts        # Processes city names dynamically
 ┃ ┣ 📜 App.tsx             # Main application UI
 ┃ ┣ 📜 types.ts            # Type definitions for itinerary
 ┣ 📜 package.json          # Project dependencies
 ┣ 📜 README.md             # Documentation (this file)
 ┣ 📜 tsconfig.json         # TypeScript config
 ┣ 📜 tailwind.config.js    # TailwindCSS config
```

---

## 📌 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PrajwalDhiwar/city-itinerary-generator.git
cd city-itinerary-generator
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

Inside the root folder, add your **Groq API Key**:

```
VITE_GROQ_API_KEY=your_api_key_here
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Your app will be available at: `http://localhost:5173`

---

## 🖥️ Usage

1. Enter a **city name** (e.g., "Cannes").
2. Select **trip dates** using the date picker.
3. Click **Generate Itinerary**.
4. View your **custom AI-generated itinerary** with:
   - Morning, afternoon, and evening activities.
   - Local tips and recommendations.

---

## 🛠️ Customization

- Modify `groq.ts` to **change the AI prompt** and tweak itinerary details.
- Update `App.tsx` styles if you want a **different UI theme**.
- Integrate a weather API for **real-time weather-based recommendations**.

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to improve this project:

1. **Fork** the repository
2. **Create a new branch** (`feature-xyz`)
3. **Commit your changes**
4. **Submit a Pull Request** 🎉

---

## 📜 License

MIT License. Feel free to use, modify, and distribute this project.

---

## 📧 Contact

- GitHub: Prajwal Dhiwar(https://github.com/PrajwalDhiwar)
- Email: prajwal@automation-ally.com

Enjoy planning your perfect trip with AI! ✈️ 🌍

