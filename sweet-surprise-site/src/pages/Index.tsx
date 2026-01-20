import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake3D } from "@/components/Cake3D";
import { CakeKnife } from "@/components/CakeKnife";
import { TypewriterMessage } from "@/components/TypewriterMessage";
import { FloatingPhotos } from "@/components/FloatingPhotos";
import { ParticleBackground } from "@/components/ParticleBackground";
import { CutCakeButton } from "@/components/CutCakeButton";
import { BIRTHDAY_MESSAGE, SURPRISE_TITLE } from "@/config/celebration";

type CelebrationPhase = "cake" | "cutting" | "message" | "photos";

const Index = () => {
  const [phase, setPhase] = useState<CelebrationPhase>("cake");
  const [hasClicked, setHasClicked] = useState(false);

  const triggerConfetti = useCallback(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Burst from multiple points
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#FF6B6B', '#87CEEB'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#FF6B6B', '#87CEEB'],
      });
    }, 250);

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#FFA500'],
    });

    // Heart shapes
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    });

    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.5, x: 0.5 },
        shapes: [heart],
        colors: ['#FF69B4', '#FF1493', '#FFB6C1'],
        scalar: 2,
      });
    }, 500);
  }, []);

  const handleCutCake = useCallback(() => {
    if (hasClicked) return;
    setHasClicked(true);
    setPhase("cutting");

    setTimeout(() => {
      triggerConfetti();
      setPhase("message");
    }, 1000);
  }, [hasClicked, triggerConfetti]);

  const handleMessageComplete = useCallback(() => {
    setPhase("photos");
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <main className="relative min-h-screen celebration-bg overflow-hidden">
      <ParticleBackground />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        
        <AnimatePresence mode="wait">
          {/* Cake Phase */}
          {(phase === "cake" || phase === "cutting") && (
            <motion.div
              key="cake-section"
              className="flex flex-col items-center gap-10 md:gap-14"
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
            >
              {/* Decorative top element */}
              <motion.div
                className="flex items-center gap-4 mb-2"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <motion.span 
                  className="text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎂
                </motion.span>
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.span>
              </motion.div>

              {/* Title */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gold-text text-shadow-glow tracking-wide">
                  {SURPRISE_TITLE}
                </h1>
                <motion.div 
                  className="mt-4 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>

              {/* Cake with knife animation */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Cake3D isCut={phase === "cutting"} />
                <CakeKnife isAnimating={phase === "cutting"} />
              </motion.div>

              {/* Cut Cake Button */}
              <CutCakeButton onClick={handleCutCake} disabled={hasClicked} />
              
              {/* Decorative bottom text */}
              <motion.p
                className="text-muted-foreground text-sm tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
              >
                Click the button to reveal your surprise
              </motion.p>
            </motion.div>
          )}

          {/* Message Phase */}
          {phase === "message" && (
            <motion.div
              key="message-section"
              className="relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <TypewriterMessage
                message={BIRTHDAY_MESSAGE}
                onComplete={handleMessageComplete}
              />
            </motion.div>
          )}

          {/* Photos Phase */}
          {phase === "photos" && (
            <motion.div
              key="photos-section"
              className="fixed inset-0 flex flex-col items-center justify-start pt-8 md:pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Message stays visible but compact */}
              <motion.div
                className="relative z-40"
                initial={{ scale: 1, y: 0 }}
                animate={{ scale: 0.75, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div 
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(260 35% 12% / 0.98) 0%, hsl(280 30% 8% / 0.99) 100%)",
                    boxShadow: "0 0 80px hsl(42 100% 50% / 0.2), 0 20px 50px rgba(0,0,0,0.5)",
                    border: "1px solid hsl(42 60% 50% / 0.25)",
                  }}
                >
                  {BIRTHDAY_MESSAGE.split('\n').map((line, i) => (
                    <p 
                      key={i} 
                      className={`text-center ${i === 0 ? 'text-3xl md:text-4xl lg:text-5xl gold-text font-script' : 'text-lg md:text-xl text-foreground/90 font-light'}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Floating photos */}
              <FloatingPhotos />

              {/* Replay hint */}
              <motion.p
                className="fixed bottom-6 text-muted-foreground text-sm tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                ✨ Refresh the page to experience again ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dim overlay during cutting */}
      <AnimatePresence>
        {phase === "cutting" && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(260 30% 5% / 0.4) 100%)",
        }}
      />
    </main>
  );
};

export default Index;
