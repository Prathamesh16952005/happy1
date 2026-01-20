import { motion } from "framer-motion";

interface CakeKnifeProps {
  isAnimating: boolean;
}

export const CakeKnife = ({ isAnimating }: CakeKnifeProps) => {
  if (!isAnimating) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative"
        initial={{ x: 250, y: -150, rotate: -50 }}
        animate={{ 
          x: [250, 20, 0, -30],
          y: [-150, 30, 80, 120],
          rotate: [-50, -45, -5, 20]
        }}
        transition={{ 
          duration: 1,
          times: [0, 0.35, 0.7, 1],
          ease: "easeInOut"
        }}
      >
        {/* Knife glow effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse, hsl(0 0% 100% / 0.3) 0%, transparent 70%)",
            filter: "blur(15px)",
            transform: "scale(2)",
          }}
        />
        
        {/* Handle - elegant wood grain */}
        <div 
          className="relative w-8 h-24 rounded-t-lg overflow-hidden"
          style={{
            background: "linear-gradient(90deg, hsl(25 60% 25%) 0%, hsl(30 55% 35%) 30%, hsl(25 60% 30%) 60%, hsl(20 65% 22%) 100%)",
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3), inset 2px 0 4px rgba(255,255,255,0.1), 2px 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {/* Handle details - rivets */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-amber-700" style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)" }} />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-amber-700" style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)" }} />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-amber-700" style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)" }} />
        </div>
        
        {/* Blade guard */}
        <div 
          className="relative w-12 h-3 -ml-2"
          style={{
            background: "linear-gradient(90deg, hsl(42 50% 60%) 0%, hsl(45 60% 75%) 50%, hsl(42 50% 60%) 100%)",
            borderRadius: "2px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        />
        
        {/* Blade - polished steel effect */}
        <div className="relative">
          <div 
            className="w-8 h-40"
            style={{
              background: "linear-gradient(90deg, hsl(220 10% 75%) 0%, hsl(220 5% 95%) 20%, hsl(220 8% 90%) 40%, hsl(220 5% 98%) 60%, hsl(220 10% 85%) 80%, hsl(220 15% 70%) 100%)",
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
              boxShadow: "4px 0 15px rgba(255,255,255,0.4), -2px 0 10px rgba(0,0,0,0.2)",
            }}
          />
          
          {/* Blade shine */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
          />
          
          {/* Blade edge highlight */}
          <div 
            className="absolute right-0 top-0 w-1 h-full"
            style={{
              background: "linear-gradient(180deg, white 0%, hsl(220 10% 90%) 50%, white 100%)",
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 85%)",
            }}
          />
        </div>
      </motion.div>
      
      {/* Cutting effect - sparkles */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              boxShadow: "0 0 10px hsl(42 100% 60%)",
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2) * 60,
              y: Math.sin((i / 8) * Math.PI * 2) * 60,
              opacity: 0,
              scale: [1, 0],
            }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
