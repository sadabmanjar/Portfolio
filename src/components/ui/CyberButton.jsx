import React from 'react';
import { motion } from 'framer-motion';

const handleRipple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  const rect = btn.getBoundingClientRect();
  circle.style.cssText = `
    width: ${diameter}px;
    height: ${diameter}px;
    left: ${e.clientX - rect.left - radius}px;
    top: ${e.clientY - rect.top - radius}px;
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s ease-out forwards;
    pointer-events: none;
  `;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
};

/**
 * CyberButton — Premium reusable button component
 *
 * Props:
 *   children   — button label / content
 *   variant    — 'primary' (filled cyan) | 'outline' (transparent + cyan border)
 *   onClick    — optional click handler
 *   href       — if provided, renders as an <a> tag
 *   className  — extra Tailwind classes
 *   type       — HTML button type (default: 'button')
 *   disabled   — disables the button
 *   target     — anchor target (e.g. '_blank'), used when href is set
 */
const CyberButton = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
}) => {
  const baseClass = `cyber-btn relative overflow-hidden font-mono text-sm font-bold px-6 py-3 rounded-lg 
    transition-colors duration-300 cursor-pointer select-none
    ${variant === 'primary'
      ? 'bg-accent-cyan text-black hover:bg-accent-cyan/90'
      : variant === 'ghost'
        ? 'text-accent-cyan bg-transparent hover:bg-accent-cyan/10'
        : 'border border-accent-cyan/50 text-accent-cyan bg-transparent hover:bg-accent-cyan/10'
    }
    ${disabled ? 'opacity-40 pointer-events-none' : ''}
    ${className}`;

  const motionProps = {
    className: baseClass,
    whileHover: {
      scale: 1.05,
      boxShadow: '0 0 20px rgba(0,229,255,0.5), 0 0 40px rgba(0,229,255,0.2)',
    },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
    onClick: (e) => {
      if (!disabled) {
        handleRipple(e);
        onClick?.();
      }
    },
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
};

export default CyberButton;
