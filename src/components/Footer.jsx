import React from 'react';
import { portfolioData } from '../data/portfolio';

const Footer = () => {
  const { personal } = portfolioData;

  const socialLinks = [
    { name: 'GitHub', url: personal.github, icon: '🐙' },
    { name: 'LinkedIn', url: personal.linkedin, icon: '💼' },
    { name: 'Twitter', url: personal.twitter, icon: '🐦' },
  ];

  return (
    <footer className="bg-bg-alt border-t border-border-main py-12 px-6">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div>
          <h2 className="font-orbitron text-sm text-accent-cyan tracking-[0.4em] uppercase">
            {personal.name}
          </h2>
          <p className="text-muted text-[10px] font-mono mt-1 uppercase tracking-widest">
            {personal.role}
          </p>
        </div>

        <div className="flex justify-center gap-6">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-cyan transition-colors text-lg"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 inline-block px-12">
          <p className="text-slate-700 text-[10px] font-mono tracking-wider">
            Designed & Built by {personal.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
