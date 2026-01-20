import { motion } from "framer-motion";
import { CUT_CAKE_BUTTON_TEXT } from "@/config/celebration";

interface CutCakeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const CutCakeButton = ({ onClick, disabled }: CutCakeButtonProps) => {
  if (disabled) return null;

  return (
    <motion.button
      onClick={onClick}
      className="relative px-12 py-6 text-xl md:text-2xl font-display font-semibold rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        background: "linear-gradient(135deg, hsl(42 95% 50%) 0%, hsl(35 100% 48%) 50%, hsl(42 90% 52%) 100%)",
        color: "hsl(260 30% 8%)",
        boxShadow: "0 10px 50px hsl(42 100% 50% / 0.5), 0 4px 20px hsl(42 100% 40% / 0.3), inset 0 2px 0 hsl(50 100% 80% / 0.5), inset 0 -2px 0 hsl(35 100% 40% / 0.3)",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.08,
        boxShadow: "0 15px 60px hsl(42 100% 50% / 0.7), 0 6px 25px hsl(42 100% 40% / 0.4), inset 0 2px 0 hsl(50 100% 80% / 0.5), inset 0 -2px 0 hsl(35 100% 40% / 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, hsl(45 100% 55%) 0%, hsl(40 100% 50%) 50%, hsl(45 95% 55%) 100%)",
        }}
      />
      
      {/* Shine sweep effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          transform: "skewX(-20deg)",
        }}
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
      
      {/* Sparkle decorations */}
      <motion.span
        className="absolute top-2 left-4 text-lg opacity-80"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✨
      </motion.span>
      <motion.span
        className="absolute bottom-2 right-4 text-lg opacity-80"
        animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.span>
      
      {/* Button text */}
      <span className="relative z-10 tracking-wide">{CUT_CAKE_BUTTON_TEXT}</span>
      
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "linear-gradient(135deg, hsl(42 100% 60% / 0.3) 0%, transparent 50%, hsl(42 100% 60% / 0.3) 100%)",
          filter: "blur(8px)",
        }}
      />
      
      {/* Pulsing ring */}
      <motion.div
        className="absolute -inset-2 rounded-3xl"
        style={{
          border: "2px solid hsl(42 100% 60% / 0.3)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};
