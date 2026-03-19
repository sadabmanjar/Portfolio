<div align="center">

# ⚡ Md Sadab Manjar — Portfolio

### Software Engineer Intern | Full Stack Developer

_Building scalable digital systems that solve real-world problems._

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-https://sadabportfolio.vercel.app/-00e5ff?style=for-the-badge&labelColor=050508)](https://sadabmanjar.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-md--sadab--manjar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/md-sadab-manjar)
[![GitHub](https://img.shields.io/badge/GitHub-sadabmanjar-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sadabmanjar)
[![Email](https://img.shields.io/badge/Email-mdsadabmanjar786@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mdsadabmanjar786@gmail.com)

</div>

---

## 🖥️ Preview

> Dark cyberpunk-themed personal portfolio with smooth animations, dark/light mode, and fully responsive design.

---

## ✨ Features

- ⚡ **Cyberpunk Dark Theme** — deep blacks, neon cyan & purple accents
- 🌗 **Dark / Light Mode** — toggle with localStorage persistence
- 🎞️ **Framer Motion Animations** — scroll reveals, staggered entrances, glitch effects
- ⌨️ **Typewriter Effect** — cycling role titles in the hero section
- 📱 **Fully Responsive** — mobile-first design, works on all screen sizes
- 🧭 **Smooth Scroll Navigation** — active section highlighting via Intersection Observer
- 🚀 **Scroll Progress Bar** — fixed top bar showing page read progress
- 🎯 **Bento Grid Projects** — featured project layout with hover glow effects
- 📬 **Contact Form** — with loading and success states

---

## 🛠️ Tech Stack

| Category       | Technologies                                |
| -------------- | ------------------------------------------- |
| **Frontend**   | React 18, Tailwind CSS (JIT), Framer Motion |
| **Fonts**      | Orbitron (display), JetBrains Mono (body)   |
| **Animations** | Framer Motion, CSS Keyframes (glitch)       |
| **Tooling**    | Vite, ESLint, gh-pages                      |
| **Deployment** | GitHub Pages / Vercel                       |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav with scroll spy + mobile drawer
│   ├── Hero.jsx            # Glitch name + typewriter + animated grid bg
│   ├── About.jsx           # Bio + animated stat counters
│   ├── Skills.jsx          # Categorized skill chips with filter
│   ├── Projects.jsx        # Bento grid project cards
│   ├── Experience.jsx      # Animated timeline + currently building section
│   ├── Education.jsx       # Education card
│   ├── Certifications.jsx  # Certification badge grid
│   ├── Contact.jsx         # Contact form + social links
│   ├── Footer.jsx          # Minimal footer
│   ├── Cursor.jsx          # Custom cyberpunk cursor
│   └── Preloader.jsx       # Page load animation
├── hooks/
│   ├── useTypewriter.js    # Typewriter cycling hook
│   ├── useCountUp.js       # Animated number counter hook
│   └── useScrollProgress.js # Page scroll percentage hook
├── context/
│   └── ThemeContext.jsx    # Dark/light mode context + localStorage
├── data/
│   └── portfolio.js        # All personal data in one place
├── App.jsx
└── index.css               # CSS variables for theming
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/sadabmanjar/portfolio.git

# 2. Navigate into the project
cd portfolio

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎨 Customization

All personal data lives in one file — `src/data/portfolio.js`.

To update your details, just edit:

```js
const portfolioData = {
  personal: {
    name: "Your Name",
    role: "Your Role",
    tagline: "Your tagline here",
    email: "your@email.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  skills: [ ... ],
  projects: [ ... ],
  experience: [ ... ],
  // ...
}
```

To change colors, update `tailwind.config.js`:

```js
colors: {
  'cyber-cyan':   '#00e5ff',   // primary accent
  'cyber-purple': '#9b59ff',   // secondary accent
  'cyber-black':  '#050508',   // page background
}
```

---

## 📄 Sections

| Section            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| **Hero**           | Name with glitch effect, typewriter role, CTA buttons      |
| **About**          | Bio, avatar, animated stats counter                        |
| **Skills**         | Tech stack chips grouped by category                       |
| **Projects**       | MoveCare, Campus Navigation, Entrepreneurship Club Website |
| **Experience**     | Software Engineer Intern, Cisco Cybersecurity Analyst      |
| **Education**      | B.Tech Engineering — 1st Year                              |
| **Certifications** | Internship & Cisco certifications                          |
| **Contact**        | Form + GitHub, LinkedIn, Email links                       |

---

## 📬 Contact

**Md Sadab Manjar**

- 🌐 Portfolio: [sadabmanjar.github.io](https://sadabmanjar.github.io)
- 💼 LinkedIn: [md-sadab-manjar](https://www.linkedin.com/in/md-sadab-manjar)
- 🐙 GitHub: [sadabmanjar](https://github.com/sadabmanjar)
- 📧 Email: [mdsadabmanjar786@gmail.com](mailto:mdsadabmanjar786@gmail.com)

---

<div align="center">

Designed & Built by **Md Sadab Manjar** · 2025

⭐ Star this repo if you found it helpful!

</div>
