import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterMessageProps {
  message: string;
  onComplete?: () => void;
}

export const TypewriterMessage = ({ message, onComplete }: TypewriterMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      const completeTimeout = setTimeout(onComplete, 2500);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, message, onComplete]);

  const lines = displayedText.split('\n');

  return (
    <motion.div
      className="text-center max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Decorative outer frame */}
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Glowing border effect */}
        <div 
          className="absolute -inset-1 rounded-[2.5rem] opacity-60"
          style={{
            background: "linear-gradient(135deg, hsl(42 100% 50% / 0.4) 0%, hsl(340 80% 60% / 0.3) 50%, hsl(42 100% 50% / 0.4) 100%)",
            filter: "blur(15px)",
          }}
        />
        
        {/* Main card */}
        <div 
          className="relative p-10 md:p-14 rounded-[2rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(260 35% 12% / 0.95) 0%, hsl(280 30% 10% / 0.98) 50%, hsl(260 35% 8% / 0.98) 100%)",
            boxShadow: "0 0 80px hsl(42 100% 50% / 0.15), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            border: "1px solid hsl(42 60% 50% / 0.2)",
          }}
        >
          {/* Inner glow */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, hsl(42 100% 50% / 0.05) 0%, transparent 60%)",
            }}
          />
          
          {/* Corner flourishes */}
          <motion.div 
            className="absolute top-4 left-4 text-3xl opacity-70"
            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✦
          </motion.div>
          <motion.div 
            className="absolute top-4 right-4 text-3xl opacity-70"
            animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            ✦
          </motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          <motion.div 
            className="absolute bottom-4 right-4 text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            💖
          </motion.div>

          {/* Decorative lines */}
          <div className="absolute top-8 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute bottom-8 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Message text */}
          <div className="relative space-y-5 py-4">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                className={`
                  ${index === 0 
                    ? 'text-5xl md:text-6xl lg:text-7xl gold-text font-script text-shadow-glow' 
                    : 'text-xl md:text-2xl lg:text-3xl text-foreground font-light tracking-wide'
                  }
                `}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Cursor */}
          {currentIndex < message.length && (
            <motion.span
              className="inline-block w-0.5 h-8 bg-primary ml-1 rounded-full"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ boxShadow: "0 0 10px hsl(42 100% 60%)" }}
            />
          )}
        </div>
      </motion.div>

      {/* Floating hearts animation */}
      <div className="relative h-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + i * 9}%`,
              bottom: -50,
            }}
            initial={{ y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              y: -300,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.4 + 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '💕' : '💗'}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
