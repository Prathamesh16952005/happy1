import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CELEBRATION_PHOTOS } from "@/config/celebration";

interface PhotoCardProps {
  src: string;
  index: number;
  totalPhotos: number;
}

const PhotoCard = ({ src, index, totalPhotos }: PhotoCardProps) => {
  const baseDelay = (index / totalPhotos) * 15;
  const yOffset = Math.sin(index * 1.2) * 80 + 50;
  const rotation = (index % 2 === 0 ? 1 : -1) * (4 + (index % 3) * 4);
  const size = 200 + (index % 3) * 40;

  return (
    <motion.div
      className="absolute flex-shrink-0"
      style={{
        top: `${yOffset}px`,
      }}
      initial={{ x: window.innerWidth + 300 }}
      animate={{ 
        x: [window.innerWidth + 300, -400],
        rotate: [rotation, -rotation * 0.5, rotation * 0.8, -rotation],
        y: [yOffset, yOffset + 30, yOffset - 20, yOffset + 15, yOffset],
      }}
      transition={{
        x: {
          duration: 30 + index * 3,
          delay: baseDelay,
          repeat: Infinity,
          ease: "linear",
        },
        rotate: {
          duration: 8,
          delay: baseDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 6,
          delay: baseDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.15, rotate: 0, zIndex: 100 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Glow effect behind card */}
        <motion.div 
          className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, hsl(42 100% 50% / 0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        
        {/* Card shadow - layered for depth */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ 
            transform: "translateY(15px) translateX(8px) rotate(2deg)",
            background: "rgba(0,0,0,0.4)",
            filter: "blur(20px)",
          }}
        />
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{ 
            transform: "translateY(8px) translateX(4px)",
            background: "rgba(0,0,0,0.2)",
            filter: "blur(10px)",
          }}
        />
        
        {/* Photo frame - polaroid style */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{
            padding: "12px 12px 40px 12px",
            background: "linear-gradient(145deg, hsl(40 30% 98%) 0%, hsl(40 20% 92%) 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 white",
          }}
        >
          {/* Photo */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={src}
              alt={`Memory ${index + 1}`}
              style={{ width: size, height: size }}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Photo overlay gradient */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(180deg, transparent 60%, hsl(42 100% 50% / 0.2) 100%)",
              }}
            />
          </div>
          
          {/* Polaroid shine */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
              borderRadius: "1rem",
            }}
          />
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-3 -right-3 text-2xl drop-shadow-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {index % 3 === 0 ? '❤️' : index % 3 === 1 ? '💕' : '✨'}
        </motion.div>
        
        {/* Tape effect on top */}
        <div 
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6"
          style={{
            background: "linear-gradient(180deg, hsl(42 60% 85% / 0.8) 0%, hsl(42 50% 75% / 0.6) 100%)",
            transform: "translateX(-50%) rotate(-2deg)",
            borderRadius: "2px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const FloatingPhotos = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Duplicate photos for continuous flow
  const allPhotos = [...CELEBRATION_PHOTOS, ...CELEBRATION_PHOTOS];

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {allPhotos.map((photo, index) => (
        <PhotoCard
          key={`photo-${index}`}
          src={photo}
          index={index}
          totalPhotos={allPhotos.length}
        />
      ))}
    </motion.div>
  );
};
