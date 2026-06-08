"use client";
import React from 'react';
import { motion } from 'framer-motion';

// --- Shared Elements ---

const Steam = ({ color = "rgba(255,255,255,0.8)" }) => (
  <motion.path
    d="M 40 20 Q 30 10, 40 0 T 40 -20"
    fill="none"
    stroke="url(#steam-grad)"
    strokeWidth="2.5"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0, y: 10, filter: "blur(2px)" }}
    animate={{ pathLength: 1, opacity: [0, 0.8, 0], y: -30, filter: "blur(4px)" }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  />
);

const SteamGroup = () => (
   <g>
      <defs>
         <linearGradient id="steam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
         </linearGradient>
      </defs>
      <Steam />
      <motion.g animate={{ x: 25, y: 8 }} transition={{ duration: 0 }}><Steam /></motion.g>
      <motion.g animate={{ x: -18, y: -5 }} transition={{ duration: 0 }}><Steam /></motion.g>
   </g>
);

const DropShadow = () => (
   <motion.ellipse 
      cx="50" cy="90" rx="35" ry="8" 
      fill="rgba(0,0,0,0.25)" 
      filter="blur(4px)"
      animate={{ rx: [35, 30, 35], opacity: [0.25, 0.15, 0.25] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
   />
);

// --- Individual Icons ---

const PizzaIcon = ({ name, size }: { name: string, size: number }) => {
  const n = name.toLowerCase();
  const isSquare = n.includes('square');
  const isCrown = n.includes('crown');
  const isWhite = n.includes('malai') || n.includes('white');
  const hasKabab = n.includes('kabab') || n.includes('steak');
  const extraCheese = n.includes('stuffed') || n.includes('cheese');

  const crustColor1 = "#F5A623";
  const crustColor2 = isWhite ? "#E6C280" : "#D0021B";
  const cheeseColor1 = isWhite ? "#FFFFFF" : "#F8E71C";
  const cheeseColor2 = isWhite ? "#F5F5F5" : "#F5A623";

  // Dynamic dripping paths
  const dripPath1 = "M 28 62 Q 33 75, 38 62 M 62 62 Q 67 80, 72 58";
  const dripPath2 = extraCheese 
      ? "M 28 62 Q 33 95, 38 62 M 62 62 Q 67 100, 72 58 M 45 75 Q 50 110, 55 75" 
      : "M 28 62 Q 33 85, 38 62 M 62 62 Q 67 90, 72 58";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
         <linearGradient id={`crust-grad-${name.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={crustColor1} />
            <stop offset="100%" stopColor={crustColor2} />
         </linearGradient>
         <linearGradient id={`cheese-grad-${name.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cheeseColor1} />
            <stop offset="100%" stopColor={cheeseColor2} />
         </linearGradient>
      </defs>
      
      <DropShadow />
      <SteamGroup />
      
      <motion.g
        initial={{ y: 0, rotate: -3 }}
        animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={isSquare ? "M 20 20 L 80 20 L 80 80 L 20 80 Z" : "M 10 30 Q 50 10, 90 30 L 50 90 Z"} fill={crustColor2} opacity="0.2" filter="blur(8px)" transform="scale(1.1) translate(-5, -5)" />
        
        {/* Crust */}
        {isCrown && (
           <path d="M 5 25 L 15 15 L 25 25 L 35 15 L 45 25 L 50 10 L 55 25 L 65 15 L 75 25 L 85 15 L 95 25 L 50 90 Z" fill={`url(#crust-grad-${name.replace(/\s/g,'')})`} stroke="#8B572A" strokeWidth="2" strokeLinejoin="round" />
        )}
        {!isCrown && (
           <path d={isSquare ? "M 15 20 L 85 20 L 50 85 Z" : "M 10 30 Q 50 10, 90 30 L 50 90 Z"} fill={`url(#crust-grad-${name.replace(/\s/g,'')})`} stroke="#8B572A" strokeWidth="3" strokeLinejoin="round" />
        )}
        
        {/* Cheese Base */}
        <path d={isSquare ? "M 25 25 L 75 25 L 50 75 Z" : "M 15 32 Q 50 15, 85 32 L 50 85 Z"} fill={`url(#cheese-grad-${name.replace(/\s/g,'')})`} />
        
        {/* Dynamic Melting Cheese Drips */}
        <motion.path 
           d={dripPath1} 
           fill="none" stroke={cheeseColor2} strokeWidth={extraCheese ? "5" : "3.5"} strokeLinecap="round"
           animate={{ d: [dripPath1, dripPath2, dripPath1] }} 
           transition={{ duration: extraCheese ? 1.5 : 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Toppings */}
        {!isWhite && !hasKabab && (
           <g>
             <circle cx="50" cy="40" r="8" fill="#D0021B" stroke="#900" strokeWidth="1" />
             <path d="M 46 36 Q 50 34, 54 36" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
             <circle cx="35" cy="55" r="7" fill="#D0021B" stroke="#900" strokeWidth="1" />
             <circle cx="65" cy="50" r="6" fill="#D0021B" stroke="#900" strokeWidth="1" />
             <circle cx="40" cy="35" r="4" fill="#D0021B" />
             <circle cx="70" cy="35" r="5" fill="#D0021B" />
           </g>
        )}
        {hasKabab && (
           <g fill="#5E3013">
              <rect x="45" y="35" width="12" height="6" rx="2" transform="rotate(30 50 40)" />
              <rect x="30" y="50" width="10" height="5" rx="2" transform="rotate(-20 35 55)" />
              <rect x="60" y="45" width="14" height="6" rx="2" transform="rotate(45 65 50)" />
           </g>
        )}

        {/* Olives */}
        <g fill="#000">
           <circle cx="30" cy="45" r="2.5" />
           <circle cx="60" cy="40" r="2.5" />
           <circle cx="55" cy="60" r="2.5" />
           <circle cx="45" cy="50" r="2.5" />
        </g>
      </motion.g>
    </svg>
  );
};

const BurgerIcon = ({ name, size }: { name: string, size: number }) => {
  const n = name.toLowerCase();
  const isZinger = n.includes('zinger');
  const isDouble = n.includes('double') || n.includes('big ben');
  const isChapli = n.includes('chapli');
  const hasCheese = n.includes('cheese');
  
  const pattyGrad = isZinger ? ["#F5A623", "#D87A00"] : (isChapli ? ["#3E1A04", "#2A1000"] : ["#5E3013", "#3E1A04"]);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
         <linearGradient id={`bun-grad-${name.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#8B572A" />
         </linearGradient>
         <linearGradient id={`patty-grad-${name.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={pattyGrad[0]} />
            <stop offset="100%" stopColor={pattyGrad[1]} />
         </linearGradient>
      </defs>
      
      <DropShadow />
      <SteamGroup />
      
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Bottom Bun */}
        <path d="M 20 80 Q 50 90, 80 80 L 80 75 Q 50 80, 20 75 Z" fill={`url(#bun-grad-${name.replace(/\s/g,'')})`} />
        
        {/* Patty 1 */}
        <motion.path 
           d={isZinger ? "M 15 70 L 25 68 L 35 72 L 45 68 L 55 72 L 65 68 L 75 72 L 85 70 Q 85 75, 80 75 L 20 75 Q 15 75, 15 70 Z" : (isChapli ? "M 10 70 L 90 70 Q 85 75, 80 75 L 20 75 Q 15 75, 10 70 Z" : "M 18 70 L 82 70 Q 85 72.5, 80 75 L 20 75 Q 15 72.5, 18 70 Z")} 
           fill={`url(#patty-grad-${name.replace(/\s/g,'')})`} 
           animate={{ scaleX: [1, 1.02, 1] }} 
           transition={{ duration: isZinger ? 0.3 : 0.5, repeat: Infinity, repeatType: "mirror" }} 
           style={{ transformOrigin: "center 72.5px" }}
        />
        
        {/* Double Patty logic */}
        {isDouble && (
           <motion.path 
              d="M 18 64 L 82 64 Q 85 66.5, 80 69 L 20 69 Q 15 66.5, 18 64 Z" 
              fill={`url(#patty-grad-${name.replace(/\s/g,'')})`} 
              animate={{ scaleX: [1, 1.02, 1] }} 
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }} 
              style={{ transformOrigin: "center 66px" }}
           />
        )}
        
        {/* Dynamic Melting Cheese */}
        {(hasCheese || isDouble) && (
           <motion.g animate={{ scaleY: hasCheese ? [1, 1.1, 1] : 1 }} transition={{ duration: 1.5, repeat: Infinity }}>
              <path 
                 d={isDouble ? "M 18 62 L 82 62 L 82 66 Q 75 76, 70 66 L 60 66 Q 55 74, 50 66 L 40 66 Q 35 72, 30 66 L 20 66 Z" : "M 18 68 L 82 68 L 82 72 Q 75 82, 70 72 L 60 72 Q 55 80, 50 72 L 40 72 Q 35 78, 30 72 L 20 72 Z"} 
                 fill="#F8E71C" 
              />
              {hasCheese && (
                 <path d="M 25 72 Q 30 80, 35 72 L 45 72 Q 50 82, 55 72 Z" fill="#F5A623" opacity="0.5" />
              )}
           </motion.g>
        )}
        
        {/* Lettuce */}
        <motion.path 
           d="M 12 60 Q 25 45, 35 60 T 55 60 T 75 60 T 88 60 L 80 64 L 20 64 Z" 
           fill="#7ED321" 
           animate={{ y: [0, 1, 0] }}
           transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Tomatos */}
        <rect x="25" y="55" width="50" height="6" rx="3" fill="#D0021B" />
        <rect x="30" y="55" width="40" height="6" rx="3" fill="#FF2D55" />
        
        {/* Top Bun */}
        <motion.g
           animate={{ y: [-2, 2, -2] }}
           transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
           <path d="M 15 55 Q 50 5, 85 55 Z" fill={`url(#bun-grad-${name.replace(/\s/g,'')})`} />
           <path d="M 25 50 Q 50 20, 75 50 Z" fill="#F8E71C" opacity="0.1" />
           
           {/* Seeds */}
           <g fill="#FFF8DC">
              <ellipse cx="35" cy="40" rx="1.5" ry="3.5" transform="rotate(30 35 40)" />
              <ellipse cx="50" cy="35" rx="1.5" ry="3.5" />
              <ellipse cx="65" cy="40" rx="1.5" ry="3.5" transform="rotate(-30 65 40)" />
              <ellipse cx="40" cy="45" rx="1.5" ry="3.5" transform="rotate(15 40 45)" />
              <ellipse cx="60" cy="47" rx="1.5" ry="3.5" transform="rotate(-15 60 47)" />
              <ellipse cx="50" cy="25" rx="1.5" ry="3.5" transform="rotate(10 50 25)" />
              <ellipse cx="28" cy="47" rx="1.5" ry="3.5" transform="rotate(45 28 47)" />
              <ellipse cx="72" cy="49" rx="1.5" ry="3.5" transform="rotate(-45 72 49)" />
           </g>
        </motion.g>
      </motion.g>
    </svg>
  );
};

const FriesIcon = ({ name, size }: { name: string, size: number }) => {
  const n = name.toLowerCase();
  const hasCheese = n.includes('cheese');
  const hasMasala = n.includes('masala') || n.includes('special');
  const hasMayo = n.includes('mayo');
  const isZinger = n.includes('chicken') || n.includes('zinger');

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
         <linearGradient id="fry-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8E71C" />
            <stop offset="50%" stopColor="#FFF2A8" />
            <stop offset="100%" stopColor="#F5A623" />
         </linearGradient>
         <linearGradient id="cup-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D0021B" />
            <stop offset="100%" stopColor="#900000" />
         </linearGradient>
      </defs>
      
      <DropShadow />
      <SteamGroup />
      
      <motion.g
        initial={{ rotate: -2, y: 0 }}
        animate={{ rotate: [2, -2, 2], y: [-2, 2, -2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Fries Background */}
        <motion.rect x="30" y="25" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.rect x="42" y="20" width="8" height="45" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.2 }} />
        <motion.rect x="54" y="28" width="8" height="35" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} />
        <motion.rect x="66" y="22" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.1 }} />
        <motion.rect x="25" y="35" width="8" height="35" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -3.5, 0] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }} />
        <motion.rect x="36" y="30" width="8" height="45" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -5.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
        <motion.rect x="48" y="25" width="8" height="50" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }} />
        <motion.rect x="60" y="32" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -2, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 }} />
        <motion.rect x="71" y="38" width="8" height="30" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.1 }} />

        {/* Loadings */}
        {hasCheese && (
           <motion.path 
              d="M 20 45 Q 50 35, 80 45 Q 75 60, 50 55 Q 25 60, 20 45 Z" 
              fill="#F8E71C" opacity="0.85"
              animate={{ d: ["M 20 45 Q 50 35, 80 45 Q 75 60, 50 55 Q 25 60, 20 45 Z", "M 20 45 Q 50 40, 80 45 Q 75 65, 50 58 Q 25 65, 20 45 Z", "M 20 45 Q 50 35, 80 45 Q 75 60, 50 55 Q 25 60, 20 45 Z"] }}
              transition={{ duration: 2, repeat: Infinity }}
           />
        )}
        {hasMayo && (
           <motion.path 
              d="M 25 40 Q 35 30, 45 40 T 65 40 T 75 40" 
              fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9"
              animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
           />
        )}
        {isZinger && (
           <g fill="#D87A00">
              <path d="M 30 35 Q 35 30, 40 38 Q 35 45, 30 35 Z" />
              <path d="M 60 30 Q 68 25, 75 35 Q 65 40, 60 30 Z" />
              <path d="M 45 25 Q 55 20, 58 28 Q 50 35, 45 25 Z" />
           </g>
        )}
        {hasMasala && [...Array(12)].map((_, i) => (
           <motion.circle 
              key={i}
              cx={30 + Math.random() * 40} 
              cy={20 + Math.random() * 30} 
              r={1.5} 
              fill="#D0021B" 
              animate={{ y: [0, -5 - Math.random() * 5, 0], opacity: [0, 1, 0] }} 
              transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }} 
           />
        ))}

        {/* Cup */}
        <path d="M 20 55 L 80 55 L 70 90 Q 50 95, 30 90 Z" fill="url(#cup-grad)" stroke="#FF2D55" strokeWidth="1" />
        <path d="M 25 55 L 75 55 L 67 90 Q 50 93, 33 90 Z" fill="#D0021B" />
        <path d="M 40 65 Q 50 60, 60 65 T 50 80 Z" fill="#FFF" opacity="0.3" filter="blur(2px)" />
        
        <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
           <path d="M 45 75 Q 50 80, 55 75" fill="none" stroke="#F8E71C" strokeWidth="2.5" strokeLinecap="round" />
           <circle cx="45" cy="70" r="1.5" fill="#F8E71C" />
           <circle cx="55" cy="70" r="1.5" fill="#F8E71C" />
        </motion.g>
      </motion.g>
    </svg>
  );
};

const WrapIcon = ({ name, size }: { name: string, size: number }) => {
  const n = name.toLowerCase();
  const isAchari = n.includes('achari');
  const isWhite = n.includes('malai');
  const isZinger = n.includes('zinger');

  const fillingColor1 = isAchari ? "#FF4500" : (isWhite ? "#F5F5F5" : "#D0021B");
  const fillingColor2 = isZinger ? "#D87A00" : "#5E3013";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
         <linearGradient id="wrap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="50%" stopColor="#F8E71C" />
            <stop offset="100%" stopColor="#D2B48C" />
         </linearGradient>
         <linearGradient id="foil-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9B9B9B" />
            <stop offset="50%" stopColor="#E0E0E0" />
            <stop offset="100%" stopColor="#9B9B9B" />
         </linearGradient>
      </defs>
      
      <DropShadow />
      <SteamGroup />
      
      <motion.g
        initial={{ scale: 0.95, rotate: -40 }}
        animate={{ scale: [0.95, 1.05, 0.95], rotate: [-40, -35, -40] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        <path d="M 25 20 L 75 20 Q 85 50, 75 80 L 25 80 Q 15 50, 25 20 Z" fill="url(#wrap-grad)" stroke="#CD853F" strokeWidth="2" />
        
        <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
           <line x1="32" y1="30" x2="68" y2="30" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
           <line x1="28" y1="45" x2="72" y2="45" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
           <line x1="28" y1="60" x2="72" y2="60" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Dynamic Filling */}
        <path d="M 30 20 Q 50 -5, 70 20 Z" fill="#7ED321" />
        {isZinger ? (
           <path d="M 35 20 L 40 5 L 45 20 L 50 0 L 55 20 L 60 10 L 65 20 Z" fill={fillingColor2} />
        ) : (
           <path d="M 35 20 Q 50 0, 65 20 Z" fill={fillingColor2} />
        )}
        <motion.path 
           d="M 40 20 Q 50 10, 60 20 Z" 
           fill={fillingColor1} 
           animate={{ y: [0, -3, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
        />
        
        {!isWhite && (
           <>
              <motion.circle cx="45" cy="18" r="3" fill="#F8E71C" animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.circle cx="55" cy="19" r="2.5" fill="#F8E71C" animate={{ y: [0, 2, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
           </>
        )}

        {/* Wrapper Foil */}
        <path d="M 22 50 L 78 50 L 70 85 Q 50 90, 30 85 Z" fill="url(#foil-grad)" />
        <path d="M 30 50 L 30 85" stroke="#FFF" strokeWidth="2" opacity="0.6" />
        <path d="M 45 50 L 45 88" stroke="#FFF" strokeWidth="1" opacity="0.4" />
        <path d="M 60 50 L 60 85" stroke="#FFF" strokeWidth="3" opacity="0.5" />
      </motion.g>
    </svg>
  );
};

const PastaIcon = ({ name, size }: { name: string, size: number }) => {
  const n = name.toLowerCase();
  const isCreamy = n.includes('creamy');
  const isCrunchy = n.includes('crunchy');
  const hasBBQ = n.includes('bbq');

  const sauceColor1 = isCreamy ? "#FFFFFF" : "#D0021B";
  const sauceColor2 = isCreamy ? "#F5F5F5" : "#900000";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
         <linearGradient id="plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#BDBDBD" />
         </linearGradient>
         <radialGradient id={`sauce-grad-${name.replace(/\s/g,'')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sauceColor1} />
            <stop offset="100%" stopColor={sauceColor2} />
         </radialGradient>
      </defs>
      
      <DropShadow />
      <SteamGroup />
      
      <motion.g
        initial={{ rotate: -3 }}
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        <ellipse cx="50" cy="75" rx="45" ry="18" fill="url(#plate-grad)" stroke="#9B9B9B" strokeWidth="2" />
        <ellipse cx="50" cy="73" rx="38" ry="14" fill="#F5F5F5" />
        
        <path d="M 20 70 Q 50 30, 80 70 Z" fill="#F8E71C" stroke="#F5A623" strokeWidth="2" />
        
        <g stroke="#F5A623" strokeWidth="5" strokeLinecap="round" fill="none">
           <motion.path d="M 30 60 Q 40 45, 50 60" animate={{ d: ["M 30 60 Q 40 45, 50 60", "M 30 60 Q 40 40, 50 60", "M 30 60 Q 40 45, 50 60"] }} transition={{ duration: 2, repeat: Infinity }} />
           <motion.path d="M 45 50 Q 55 35, 65 50" animate={{ d: ["M 45 50 Q 55 35, 65 50", "M 45 50 Q 55 30, 65 50", "M 45 50 Q 55 35, 65 50"] }} transition={{ duration: 2.5, repeat: Infinity }} />
           <path d="M 55 65 Q 70 50, 75 65" />
           <path d="M 25 65 Q 40 50, 50 70" />
           <path d="M 40 70 Q 55 60, 70 70" />
           <path d="M 35 55 Q 50 40, 60 55" />
        </g>

        {/* Sauce */}
        <motion.path 
           d="M 35 55 Q 50 45, 65 55 Q 60 68, 50 65 Q 40 68, 35 55 Z" 
           fill={`url(#sauce-grad-${name.replace(/\s/g,'')})`} opacity="0.9"
           animate={{ transform: ["scale(1)", "scale(1.05)", "scale(1)"] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           style={{ transformOrigin: "50px 55px" }}
        />
        <motion.path d="M 30 62 Q 35 55, 45 65 Z" fill={`url(#sauce-grad-${name.replace(/\s/g,'')})`} opacity="0.9" />
        <motion.path d="M 55 62 Q 65 55, 70 65 Z" fill={`url(#sauce-grad-${name.replace(/\s/g,'')})`} opacity="0.9" />
        
        {/* BBQ Drizzle */}
        {hasBBQ && (
           <motion.path 
              d="M 30 55 Q 40 45, 50 60 T 70 55" 
              fill="none" stroke="#5E3013" strokeWidth="3" strokeLinecap="round" opacity="0.9"
              animate={{ y: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}
           />
        )}

        {/* Crunchy Bits */}
        {isCrunchy && [...Array(8)].map((_, i) => (
           <circle key={i} cx={35 + Math.random() * 30} cy={45 + Math.random() * 15} r={2} fill="#D87A00" />
        ))}

        {/* Cheese Sprinkles */}
        {!isCreamy && [...Array(6)].map((_, i) => (
           <motion.circle 
              key={i}
              cx={40 + Math.random() * 20} 
              cy={45 + Math.random() * 15} 
              r={1.5} 
              fill="#FFF" 
              animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }} 
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }} 
           />
        ))}

        <motion.path 
           d="M 50 45 Q 42 35, 50 30 Q 58 35, 50 45 Z" 
           fill="#7ED321" stroke="#417505" strokeWidth="1"
           animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
           transition={{ duration: 2.5, repeat: Infinity }}
           style={{ transformOrigin: "50px 45px" }}
        />
      </motion.g>
    </svg>
  );
};

const DealIcon = ({ name, size }: { name: string, size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
     <DropShadow />
     <motion.g
       animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0, -10, 0] }}
       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
       style={{ transformOrigin: "center" }}
     >
       <motion.path 
          d="M 50 0 L 60 25 L 85 15 L 70 40 L 100 50 L 70 60 L 85 85 L 60 75 L 50 100 L 40 75 L 15 85 L 30 60 L 0 50 L 30 40 L 15 15 L 40 25 Z" 
          fill="#D0021B" 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
       />
       <motion.path 
          d="M 50 10 L 58 30 L 80 22 L 65 42 L 90 50 L 65 58 L 80 78 L 58 70 L 50 90 L 42 70 L 20 78 L 35 58 L 10 50 L 35 42 L 20 22 L 42 30 Z" 
          fill="#F5A623" 
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
       />
       <circle cx="50" cy="50" r="22" fill="#F8E71C" stroke="#FFFFFF" strokeWidth="3" />
       
       <text x="50" y="52" fontFamily="Impact, Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#D0021B" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '1px' }}>HOT</text>
       
       <motion.circle cx="20" cy="20" r="3" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1, repeat: Infinity }} />
       <motion.circle cx="80" cy="80" r="3" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }} />
       <motion.circle cx="85" cy="30" r="2" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
     </motion.g>
  </svg>
);

export const AnimatedFoodIcon = ({ categoryId, itemName, size = 140 }: { categoryId: string, itemName: string, size?: number }) => {
   const prefix = categoryId.replace(/[0-9]/g, '');
   
   switch(prefix) {
      case 'p': return <PizzaIcon name={itemName} size={size} />;
      case 'b': return <BurgerIcon name={itemName} size={size} />;
      case 'f': return <FriesIcon name={itemName} size={size} />;
      case 'w':
      case 'pr': return <WrapIcon name={itemName} size={size} />;
      case 'ps': return <PastaIcon name={itemName} size={size} />;
      case 'd': return <DealIcon name={itemName} size={size} />;
      default: return <DealIcon name={itemName} size={size} />;
   }
};
