import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TiltCard — Reusable 3D mouse-tracking tilt wrapper
 *
 * Props:
 *   children  — card content
 *   className — extra classes applied to the motion wrapper
 */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -14;
    const tiltY = ((x - centerX) / centerX) * 14;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,229,255,0.2), 0 0 30px rgba(0,229,255,0.1)'
          : '0 0 0px rgba(0,229,255,0)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative ${className}`}
    >
      {/* Shine layer — follows tilt direction */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(0,229,255,0.08) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
