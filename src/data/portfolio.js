export const portfolioData = {
  personal: {
    name: "Md Sadab Manjar",
    initials: "SM",
    role: "Software Engineer Intern | Full Stack Developer",
    tagline: "Building scalable digital systems that solve real-world problems.",
    email: "mdsadabmanjar786@gmail.com",
    github: "https://github.com/sadabmanjar",
    linkedin: "https://www.linkedin.com/in/md-sadab-manjar",
    twitter: "",
    resumeUrl: "/resume.pdf",
  },
  skills: [
    { category: "Frontend", items: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "⚡" },
      { name: "React", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "💨" },
    ]},
    { category: "Backend", items: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
    ]},
    { category: "Database", items: [
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
    ]},
    { category: "Tools & Platforms", items: [
      { name: "Git", icon: "🔧" },
      { name: "GitHub", icon: "🐙" },
      { name: "Postman", icon: "📮" },
      { name: "Vercel", icon: "▲" },
    ]},
  ],
  projects: [
    {
      id: 2,
      featured: true,
      title: "Campus Navigation System",
      description: "Interactive campus navigation platform with admin access control and multi-campus scalability planning, helping students and visitors navigate complex campus environments.",
      tags: ["React", "Node.js", "MongoDB", "Leaflet.js"],
      github: "https://github.com/sadabmanjar/NAV-RNTU",
      demo: "https://nav-rntu.vercel.app/"
    },
    {
      id: 1,
      featured: true,
      title: "MoveCare",
      description: "A healthcare platform enabling video consultation and remote physiotherapy sessions, connecting patients with certified professionals for quality care from home.",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/sadabmanjar",
      demo: "#"
    },
    {
      id: 3,
      featured: false,
      title: "Entrepreneurship Club Website",
      description: "Professional club platform featuring events showcase, team profiles, membership system, and announcements — serving the campus entrepreneurship community.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/sadabmanjar",
      demo: "#"
    },
  ],
  experience: [
    {
      company: "Software Company",
      role: "Software Engineer Intern",
      duration: "Recent",
      bullets: [
        "Worked on API testing and validation for production-level endpoints",
        "Performed admin panel API integration testing and verified data flows",
        "Reported bugs systematically and handled retesting after developer fixes",
        "Contributed to API documentation support and maintained structured bug reports",
        "Identified and resolved frontend UI issues to improve user experience",
        "Tested newly developed APIs and updated structured bug report workflows",
      ]
    },
    {
      company: "Cisco",
      role: "Junior Cybersecurity Analyst",
      duration: "Recent",
      bullets: [
        "Worked on cybersecurity fundamentals, network defense concepts, and endpoint security",
        "Performed threat analysis and basic security monitoring activities",
        "Gained hands-on exposure to security practices and risk awareness methodologies",
        "Studied network protection concepts through Cisco learning and practical modules",
      ]
    },
  ],
  education: {
    college: "Rabindranath Tagore University",
    degree: "Bachelor of Technology (B.Tech)",
    year: "2nd Year",
    field: "Computer Science and Engineering",
    courses: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Web Development", "Computer Networks"],
  },
  certifications: [
    { name: "Software Engineer Internship", issuer: "Practical Software Development", date: "Recent", description: "Internship-based practical experience in API testing, bug reporting, and frontend development." },
    { name: "Technical Project Development", issuer: "Learning Certifications", date: "Recent", description: "Certifications earned through real-world technical project development and implementation." },
    { name: "Junior Cybersecurity Analyst", issuer: "Cisco", date: "Recent", description: "Cybersecurity fundamentals, network defense, endpoint security, and threat analysis modules." },
  ],
  achievements: [
    { title: "Software Engineering Internship", description: "Real-world industry experience in API testing, documentation, and bug lifecycle management." },
    { title: "Real Client Project Exposure", description: "Developed and delivered projects for actual clients, gaining professional software engineering experience." },
    { title: "Hackathon Participation", description: "Competed in hackathons, building innovative solutions under time constraints with cross-functional teams." },
  ],
  currentWork: [
    "Entrepreneurship Club Website",
    "Scalable Campus Navigation Systems",
    "API Documentation and Testing Workflow",
  ],
}

