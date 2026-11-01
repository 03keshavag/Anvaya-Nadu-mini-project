# Anvaya-Nadu-mini-project

# Anvaya Nādu (ಅನ್ವಯ ನಾಡು)
### Karnataka's Digital Heritage & 3D Architectural Exploration Platform

> **"Where Karnataka's Past Comes Alive."**

**Anvaya Nādu** is a digital cultural archive and interactive architectural exploration platform dedicated to the sacred stonecraft, royal dynasties, and archaeological monuments of Karnataka. Built with Three.js and an authentic "Living Heritage" editorial design system, the platform allows visitors to explore historic destinations across Karnataka and inspect 3D models of iconic monuments from any perspective.

---

## 🌟 Key Features

1. **Cinematic Heritage Hero**
   - Muted, looping background video with an editorial dark-green overlay and high-resolution poster fallback.
   - Distinctive typography pairing: **DM Serif Display**, **Plus Jakarta Sans**, and authentic Unicode **Tiro Kannada**.

2. **Multi-Page Client-Side Routing (SPA)**
   - **`#/`** — Editorial Homepage introducing the platform, the purpose of Anvaya Nādu, curated destination spotlights, and platform roadmap.
   - **`#/explore`** — Heritage Destination Index featuring 12 historic Karnataka destinations with live search and region filters (*Northern, Southern, Central, Coastal*).
   - **`#/3d-world`** — 3D Heritage World Index categorizing 13 monuments with availability filters (*3D Available Only* vs. *In Archival Progress*).
   - **`#/3d-world/:destination`** — Destination-specific collections (*e.g., Hampi, Belur, Badami, Pattadakal, Mysuru*) displaying historical era, stone medium, and associated monuments.
   - **`#/3d-world/:destination/:monument`** — Dedicated 3D architectural viewer page with interactive Three.js controls and architectural anatomy breakdowns.
   - **`#/modules/:name`** — Reserved integration placeholders for future platform modules (*Heritage Stories, Travel Roadmap, Budget Planner*).

3. **Interactive Three.js 3D Viewer**
   - **Smooth OrbitControls**:
     - Left Mouse Drag / Touch Drag: Orbit & rotate around model
     - Right Mouse Drag / Two-finger Drag: Pan
     - Mouse Wheel / Pinch: Zoom
   - **Camera Reset**: Animated return to automatically calculated bounding-sphere framing.
   - **Auto-Rotation**: Smooth continuous inspection toggle with auto-pause on user interaction.
   - **Warm Courtyard Illumination**: Realistic daylight with hemisphere light, directional sunlight, and soft contact shadow ground plane.
   - **Fullscreen Mode**: Supported across desktop and mobile devices.

4. **3 Authentic 3D Monument Models Included**
   - 🏛️ **Stone Chariot of Vittala, Hampi** (`hampistonechariot.glb`) — 16th Century Vijayanagara Empire granite monolith shrine.
   - 🛕 **Chennakeshava Temple, Belur** (`Chennakeshava.glb`) — 12th Century Hoysala Dynasty chloritic schist (soapstone) star-shaped temple.
   - 🦁 **Monolithic Lakshmi Narasimha, Hampi** (`Narasimhaswamy.glb`) — 1528 CE colossal 6.7m in-situ carved granite sculpture.

5. **Centralized Data Catalogue (`catalog.js`)**
   - Separates data from presentation, allowing new destinations and `.glb` models to be added seamlessly.

---

## 🚀 Quick Start & How to Run

### Option 1: One-Click Launch (Windows)
Double-click [`start-viewer.bat`](./start-viewer.bat). It will launch the local Python server and open your default browser.

### Option 2: Command Line (Cross-Platform)
Make sure you have Python 3 installed, then run:

```bash
# Clone the repository
git clone https://github.com/03keshavag/Anvaya-Nadu-mini-project.git
cd Anvaya-Nadu-mini-project

# Start the local server
python server.py
```

Then open your browser at:
```
http://localhost:8080
```
*(If port 8080 is already in use, the server automatically selects the next available port, e.g., 8081).*

---

## 📁 Repository Structure

```
Anvaya-Nadu-mini-project/
├── index.html                   # Semantic multi-page application structure
├── style.css                    # "Living Heritage" editorial design tokens & layout
├── app.js                       # SPA Router, view renderers & Three.js 3D engine
├── catalog.js                   # Centralized Karnataka destinations & monuments catalogue
├── server.py                    # Custom Python HTTP server with CORS & 3D MIME types
├── start-viewer.bat             # One-click Windows starter script
├── .gitignore                   # Ignore rules for system and temp cache files
├── README.md                    # Project documentation
│
├── hampistonechariot.glb        # 3D Model: Stone Chariot of Vittala, Hampi
├── Chennakeshava.glb            # 3D Model: Chennakeshava Temple, Belur
├── Narasimhaswamy.glb           # 3D Model: Monolithic Lakshmi Narasimha, Hampi
│
├── hero_background.mp4          # Cinematic audio-free hero video
├── hero_poster.jpg              # High-resolution video poster fallback
│
├── libs/                        # Local Three.js dependencies (ES modules)
│   ├── three.module.js          # Three.js core
│   ├── controls/OrbitControls.js
│   ├── loaders/GLTFLoader.js
│   └── utils/
│
└── dest_*.jpg, *_thumb.jpg      # Photographic cultural assets for destinations & monuments
```

---

## 🎨 Color Palette & Design System

- **Deep Heritage Green**: `#182B24` (Primary brand & dark surfaces)
- **Forest Green**: `#263D32` (Section headers & active badges)
- **Warm Ivory**: `#F5F1E8` (Canvas background)
- **Muted Sandstone**: `#D7C3A3` (Dividers, stone labels & subtle borders)
- **Antique Gold**: `#B39760` (Kannada script accents & details)
- **Terracotta**: `#A65E45` (Primary call-to-actions)
- **Warm Charcoal**: `#252823` (Body typography)

---

## 📜 License & Acknowledgments

- **Heritage Imagery & Geometry**: Dedicated to Karnataka's living cultural heritage (Vijayanagara, Hoysala, Badami Chalukya, and Western Ganga dynasties).
- Built with [Three.js](https://threejs.org/).
