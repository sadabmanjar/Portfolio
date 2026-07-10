import React, { lazy } from 'react';

// Lazy Loaded Sections
const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const Education = lazy(() => import('../components/Education'));
const Certifications = lazy(() => import('../components/Certifications'));
const Achievements = lazy(() => import('../components/Achievements'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
