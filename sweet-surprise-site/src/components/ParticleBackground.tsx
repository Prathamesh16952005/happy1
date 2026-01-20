import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const ParticleBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars = [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(280 50% 15% / 0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(340 40% 15% / 0.3) 0%, transparent 50%)",
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating golden particles */}
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 15 + 15;
        const isGold = Math.random() > 0.4;
        const isRose = !isGold && Math.random() > 0.5;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              background: isGold 
                ? "radial-gradient(circle, hsl(42 100% 70%) 0%, hsl(42 100% 50%) 50%, transparent 100%)"
                : isRose
                ? "radial-gradient(circle, hsl(340 80% 70%) 0%, hsl(340 70% 50%) 50%, transparent 100%)"
                : "radial-gradient(circle, hsl(45 30% 95%) 0%, hsl(45 20% 80%) 50%, transparent 100%)",
              boxShadow: isGold 
                ? `0 0 ${size * 2}px hsl(42 100% 50% / 0.6)`
                : isRose
                ? `0 0 ${size * 2}px hsl(340 80% 60% / 0.5)`
                : `0 0 ${size}px hsl(45 30% 90% / 0.4)`,
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh",
              opacity: [0, 0.8, 0.8, 0],
              x: [0, Math.sin(i) * 30, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Large bokeh circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(${42 + i * 20} ${50 + i * 5}% ${40 + i * 5}% / 0.08) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbiting sparkles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              boxShadow: "0 0 10px hsl(42 100% 60%), 0 0 20px hsl(42 100% 50% / 0.5)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                left: 100 + i * 50,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "hsl(42 100% 70%)",
                boxShadow: "0 0 8px hsl(42 100% 60%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${10 + i * 20}%`,
            left: "-5%",
            boxShadow: "0 0 6px white, -20px 0 15px white, -40px 0 8px rgba(255,255,255,0.5)",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: [0, 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 7 + 3,
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
