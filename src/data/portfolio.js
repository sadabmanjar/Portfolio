export const portfolioData = {
  personal: {
    name: "Md Sadab Manjar",
    initials: "SM",
    role: "Software Engineer",
    tagline: "Building scalable digital systems that solve real-world problems.",
    email: "mdsadabmanjar786@gmail.com",
    github: "https://github.com/sadabmanjar",
    linkedin: "https://www.linkedin.com/in/md-sadab-manjar",
    twitter: "",
    resumeUrl: "/resume.pdf",
  },
  skills: [
    { category: "Languages", items: [
      { name: "JavaScript", icon: "⚡" },
      { name: "TypeScript", icon: "📘" },
      { name: "C++", icon: "⚙️" },
    ]},
    { category: "Frontend & Mobile", items: [
      { name: "React", icon: "⚛️" },
      { name: "Angular", icon: "🔺" },
      { name: "Ionic", icon: "📱" },
      { name: "Capacitor", icon: "⚡" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "HTML/CSS", icon: "🎨" },
    ]},
    { category: "Backend & Database", items: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "REST APIs", icon: "🔗" },
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
    ]},
    { category: "Tools & Concepts", items: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "Postman", icon: "📮" },
      { name: "BLE/IoT", icon: "📡" },
      { name: "Apps Script", icon: "📜" },
    ]},
  ],
  projects: [
    {
      id: 2,
      featured: true,
      title: "Campus Navigation System",
      image: "/projects/campus-nav.jpg",
      description: "Interactive campus navigation platform to help students and visitors discover routes. Built with a full-stack architecture, React frontend, and integrated authentication.",
      tags: ["React", "Node.js", "MongoDB", "Leaflet.js"],
      github: "https://github.com/sadabmanjar/NAV-RNTU",
      demo: "https://nav-rntu.vercel.app/"
    },
    {
      id: 4,
      featured: true,
      title: "Faculty Professional Dashboard",
      image: "/projects/faculty-dashboard.png",
      description: "Interactive dashboard designed for faculty development. Features modules for FDP planning, achievement tracking, and professional career progression.",
      tags: ["React", "Vercel", "Tailwind CSS"],
      github: "https://github.com/sadabmanjar",
      demo: "https://rntu-fdp-100.vercel.app/"
    },
    {
      id: 1,
      featured: true,
      title: "MoveCare",
      image: "/projects/movecare.png",
      description: "A healthcare platform enabling video consultation and remote physiotherapy sessions, connecting patients with certified professionals for quality care from home.",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/sadabmanjar",
      demo: "#"
    },
    {
      id: 3,
      featured: false,
      title: "Entrepreneurship Club Website",
      image: "/projects/ecell.png",
      description: "Professional club platform featuring events showcase, team profiles, membership system, and announcements — serving the campus entrepreneurship community.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/sadabmanjar",
      demo: "#"
    },
  ],
  experience: [
    {
      company: "RemotePhysios",
      role: "Software Engineer Intern",
      duration: "02/2026 - Present",
      bullets: [
        "Worked on API testing and validation for production-level endpoints",
        "Performed admin panel API integration testing and verified data flows",
        "Developed healthcare web and mobile applications using Angular, Ionic, and Capacitor.",
        "Converted a healthcare web platform into Android and iOS mobile applications.",
        "Integrated BLE-based medical devices (SPO2 and TENS) and designed device control workflows.",
        "Built API documentation and bug-tracking dashboards using Google Apps Script.",
        "Performed API testing, bug analysis, feature development, and technical documentation.",
        "Generated Android/iOS mobile application builds and produced production-ready APK/AAB packages."
      ]
    }
  ],
  education: {
    college: "Rabindranath Tagore University",
    degree: "Bachelor of Engineering (B.E.)",
    year: "3rd Year",
    field: "Computer Science and Engineering",
    courses: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Web Development", "Computer Networks"],
  },
  certifications: [
    { name: "Junior Cybersecurity Analyst", issuer: "Cisco Networking Academy", date: "Recent", description: "Cybersecurity fundamentals, network defense concepts, endpoint security, and threat analysis modules." },
    { name: "Power BI Workshop", issuer: "Microsoft Learn", date: "Recent", description: "Practical workshop on data visualization, analytics, and building interactive dashboards with Power BI." },
  ],
  achievements: [
    { title: "2nd Position – Internal Hackathon", description: "Secured 2nd place in the Smart India Hackathon Qualifier." },
    { title: "2nd Position – AI Hackathon", description: "Awarded 2nd place for building an innovative artificial intelligence solution under time constraints." },
  ],
  currentWork: [
    "RemotePhysios Healthcare Apps",
    "Scalable Campus Navigation Systems",
    "BLE/IoT Device Integrations",
  ],
}
