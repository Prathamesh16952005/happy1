import { motion } from "framer-motion";

interface Cake3DProps {
  isCut: boolean;
}

const Candle = ({ delay = 0, height = 10 }: { delay?: number; height?: number }) => (
  <div className="relative flex flex-col items-center">
    {/* Outer glow - largest */}
    <motion.div
      className="absolute rounded-full"
      style={{ 
        width: 50,
        height: 50,
        top: -32,
        background: "radial-gradient(circle, hsl(42 100% 70% / 0.3) 0%, transparent 70%)",
        filter: "blur(10px)",
      }}
      animate={{ 
        scale: [1, 1.3, 1.1, 1.2, 1],
        opacity: [0.4, 0.6, 0.5, 0.55, 0.4],
      }}
      transition={{ duration: 0.8 + delay * 0.5, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Middle glow */}
    <motion.div
      className="absolute rounded-full"
      style={{ 
        width: 30,
        height: 30,
        top: -24,
        background: "radial-gradient(circle, hsl(35 100% 65% / 0.6) 0%, transparent 70%)",
        filter: "blur(6px)",
      }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{ duration: 0.5 + delay * 0.3, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Flame outer */}
    <motion.div
      className="absolute animate-flicker"
      style={{ 
        width: 12,
        height: 20,
        top: -18,
        background: "linear-gradient(to top, hsl(25 100% 50%) 0%, hsl(42 100% 60%) 40%, hsl(45 100% 75%) 70%, hsl(50 100% 95%) 100%)",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        boxShadow: "0 0 15px hsl(42 100% 60% / 0.8), 0 0 30px hsl(35 100% 50% / 0.5), 0 0 45px hsl(25 100% 50% / 0.3)",
        animationDelay: `${delay * 0.1}s`,
      }}
    />
    
    {/* Flame inner (white hot core) */}
    <motion.div
      className="absolute"
      style={{ 
        width: 5,
        height: 10,
        top: -12,
        background: "linear-gradient(to top, hsl(45 100% 80%) 0%, hsl(50 100% 98%) 100%)",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        animationDelay: `${delay * 0.15}s`,
      }}
      animate={{ 
        scaleY: [1, 0.9, 1.1, 0.95, 1],
        opacity: [0.9, 1, 0.95, 1, 0.9],
      }}
      transition={{ duration: 0.2, repeat: Infinity }}
    />
    
    {/* Wick */}
    <div 
      className="relative w-[2px] bg-gradient-to-b from-gray-600 to-gray-900"
      style={{ height: 4, marginTop: -2 }}
    />
    
    {/* Candle body with drip effect */}
    <div className="relative">
      <div 
        className="w-3 bg-gradient-to-b from-cream via-white to-cream rounded-sm"
        style={{ 
          height: height * 4,
          boxShadow: "inset 2px 0 4px rgba(0,0,0,0.1), inset -2px 0 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.2)",
        }}
      />
      {/* Wax drip */}
      <div 
        className="absolute -left-0.5 top-2 w-1.5 h-3 bg-gradient-to-b from-white to-cream rounded-b-full"
        style={{ opacity: 0.9 }}
      />
    </div>
  </div>
);

export const Cake3D = ({ isCut }: Cake3DProps) => {
  return (
    <motion.div 
      className="relative"
      style={{ perspective: "1200px" }}
      animate={isCut ? { scale: 0.8, opacity: 0, rotateX: 15 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Floating animation wrapper */}
      <div className="animate-float">
        {/* Cake container with 3D effect */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Ambient light effect on cake */}
          <div 
            className="absolute -inset-20 animate-glow-pulse"
            style={{
              background: "radial-gradient(circle at center top, hsl(42 100% 60% / 0.15) 0%, transparent 60%)",
              filter: "blur(20px)",
            }}
          />

          {/* Candles row */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-7 z-10">
            <Candle delay={0} height={12} />
            <Candle delay={0.2} height={10} />
            <Candle delay={0.1} height={14} />
            <Candle delay={0.25} height={11} />
            <Candle delay={0.15} height={13} />
          </div>

          {/* Top layer - Pink frosting with enhanced detail */}
          <motion.div
            className="relative w-52 h-14 mx-auto rounded-t-[2rem]"
            style={{
              background: "linear-gradient(180deg, hsl(340 70% 75%) 0%, hsl(340 65% 68%) 50%, hsl(340 60% 62%) 100%)",
              boxShadow: "inset 0 4px 12px rgba(255,255,255,0.3), inset 0 -6px 15px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.3)",
              transform: "rotateX(8deg)",
            }}
            animate={isCut ? { x: [-8, 8, -8], rotateZ: -12, y: -20 } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Frosting texture */}
            <div className="absolute inset-0 rounded-t-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            
            {/* Frosting drips - more organic shapes */}
            <div className="absolute -bottom-4 left-3 w-5 h-7 bg-gradient-to-b from-cake-pink to-pink-400 rounded-b-full" style={{ transform: "rotate(-5deg)" }} />
            <div className="absolute -bottom-6 left-10 w-4 h-10 bg-gradient-to-b from-cake-pink to-pink-400 rounded-b-full" />
            <div className="absolute -bottom-3 left-20 w-6 h-6 bg-gradient-to-b from-cake-pink to-pink-400 rounded-b-full" style={{ transform: "rotate(3deg)" }} />
            <div className="absolute -bottom-5 right-12 w-4 h-8 bg-gradient-to-b from-cake-pink to-pink-400 rounded-b-full" style={{ transform: "rotate(-2deg)" }} />
            <div className="absolute -bottom-4 right-4 w-5 h-6 bg-gradient-to-b from-cake-pink to-pink-400 rounded-b-full" style={{ transform: "rotate(4deg)" }} />
            
            {/* Rose decorations */}
            <div className="absolute top-2 left-4 w-4 h-4 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-sm" />
            <div className="absolute top-3 right-6 w-3 h-3 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-sm" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 shadow-sm" />
          </motion.div>

          {/* Middle layer - Cream with elegant details */}
          <motion.div
            className="relative w-60 h-16 mx-auto"
            style={{
              background: "linear-gradient(180deg, hsl(40 60% 92%) 0%, hsl(35 55% 85%) 50%, hsl(30 50% 80%) 100%)",
              boxShadow: "inset 0 4px 10px rgba(255,255,255,0.4), inset 0 -6px 15px rgba(0,0,0,0.12), 0 8px 30px rgba(0,0,0,0.25)",
              transform: "rotateX(8deg) translateY(-3px)",
            }}
            animate={isCut ? { x: [5, -5, 5], rotateZ: 6, y: 10 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Decorative gold band */}
            <div className="absolute top-4 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            
            {/* Pearl decorations */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around px-4">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white to-gray-200"
                  style={{ boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)" }}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom layer - Rich chocolate with texture */}
          <motion.div
            className="relative w-72 h-20 mx-auto rounded-b-xl"
            style={{
              background: "linear-gradient(180deg, hsl(25 50% 32%) 0%, hsl(20 55% 22%) 50%, hsl(15 60% 18%) 100%)",
              boxShadow: "inset 0 6px 15px rgba(255,255,255,0.1), inset 0 -4px 10px rgba(0,0,0,0.3), 0 15px 40px rgba(0,0,0,0.5)",
              transform: "rotateX(8deg) translateY(-6px)",
            }}
            animate={isCut ? { y: [0, 8, 0], rotateZ: -3 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {/* Chocolate pattern */}
            <div className="absolute top-3 left-0 right-0 flex justify-around px-2">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-4 h-4 rounded-full bg-gradient-to-b from-amber-800 to-amber-950"
                  style={{ boxShadow: "inset 0 2px 3px rgba(255,255,255,0.1)" }}
                />
              ))}
            </div>
            
            {/* Gold ribbon */}
            <div className="absolute bottom-5 left-0 right-0 h-2 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40" />
          </motion.div>

          {/* Elegant cake stand */}
          <div className="relative -mt-2">
            {/* Stand top */}
            <div
              className="relative w-80 h-4 mx-auto rounded-full"
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 95%) 0%, hsl(0 0% 80%) 50%, hsl(0 0% 70%) 100%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 20px rgba(0,0,0,0.3)",
                transform: "rotateX(60deg)",
              }}
            />
            {/* Stand base */}
            <div
              className="relative w-40 h-3 mx-auto -mt-1 rounded-full"
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 85%) 0%, hsl(0 0% 65%) 100%)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          {/* Cake shadow */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-10 bg-black/40 rounded-full"
            style={{ filter: "blur(20px)", transform: "rotateX(60deg)" }}
          />
        </div>
      </div>
      
      {/* Sparkle effects around cake */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary text-xl"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  );
};
