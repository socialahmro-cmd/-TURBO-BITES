"use client";
import React from 'react';
import { motion } from 'framer-motion';

// --- Shared Elements ---

const Steam = () => (
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

const PizzaIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
       <linearGradient id="crust-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#D0021B" />
       </linearGradient>
       <linearGradient id="cheese-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8E71C" />
          <stop offset="100%" stopColor="#F5A623" />
       </linearGradient>
       <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
             <feMergeNode in="coloredBlur"/>
             <feMergeNode in="SourceGraphic"/>
          </feMerge>
       </filter>
    </defs>
    
    <DropShadow />
    <SteamGroup />
    
    <motion.g
      initial={{ y: 0, rotate: -3 }}
      animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow Behind Pizza */}
      <path d="M 10 30 Q 50 10, 90 30 L 50 90 Z" fill="#D0021B" opacity="0.2" filter="blur(8px)" transform="scale(1.1) translate(-5, -5)" />
      
      {/* Crust */}
      <path d="M 10 30 Q 50 10, 90 30 L 50 90 Z" fill="url(#crust-grad)" stroke="#8B572A" strokeWidth="3" strokeLinejoin="round" />
      
      {/* Cheese Base */}
      <path d="M 15 32 Q 50 15, 85 32 L 50 85 Z" fill="url(#cheese-grad)" />
      
      {/* Dynamic Melting Cheese Drips */}
      <motion.path 
         d="M 28 62 Q 33 75, 38 62 M 62 62 Q 67 80, 72 58" 
         fill="none" stroke="#F5A623" strokeWidth="3.5" strokeLinecap="round"
         animate={{ 
            d: [
               "M 28 62 Q 33 75, 38 62 M 62 62 Q 67 80, 72 58",
               "M 28 62 Q 33 85, 38 62 M 62 62 Q 67 90, 72 58",
               "M 28 62 Q 33 75, 38 62 M 62 62 Q 67 80, 72 58"
            ] 
         }} 
         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Pepperoni with shine */}
      <g>
         <circle cx="50" cy="40" r="8" fill="#D0021B" stroke="#900" strokeWidth="1" />
         <path d="M 46 36 Q 50 34, 54 36" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
         
         <circle cx="35" cy="55" r="7" fill="#D0021B" stroke="#900" strokeWidth="1" />
         <path d="M 32 52 Q 35 50, 38 52" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
         
         <circle cx="65" cy="50" r="6" fill="#D0021B" stroke="#900" strokeWidth="1" />
         <path d="M 62 48 Q 65 46, 68 48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
         
         <circle cx="40" cy="35" r="4" fill="#D0021B" />
         <circle cx="70" cy="35" r="5" fill="#D0021B" />
      </g>

      {/* Olives */}
      <g fill="#000">
         <circle cx="30" cy="45" r="2.5" />
         <circle cx="60" cy="40" r="2.5" />
         <circle cx="55" cy="60" r="2.5" />
         <circle cx="45" cy="50" r="2.5" />
         <circle cx="50" cy="70" r="2" />
      </g>
    </motion.g>
  </svg>
);

const BurgerIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
       <linearGradient id="bun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#8B572A" />
       </linearGradient>
       <linearGradient id="patty-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5E3013" />
          <stop offset="100%" stopColor="#3E1A04" />
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
      <path d="M 20 80 Q 50 90, 80 80 L 80 75 Q 50 80, 20 75 Z" fill="url(#bun-grad)" />
      
      {/* Sizzling Meat Patty */}
      <motion.path 
         d="M 18 70 L 82 70 Q 85 72.5, 80 75 L 20 75 Q 15 72.5, 18 70 Z" 
         fill="url(#patty-grad)" 
         animate={{ scaleX: [1, 1.02, 1] }} 
         transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }} 
         style={{ transformOrigin: "center 72.5px" }}
      />
      
      {/* Dynamic Melting Cheese */}
      <motion.path 
         fill="#F8E71C" 
         animate={{ 
            d: [
               "M 18 68 L 82 68 L 82 72 Q 75 82, 70 72 L 60 72 Q 55 80, 50 72 L 40 72 Q 35 78, 30 72 L 20 72 Z",
               "M 18 68 L 82 68 L 82 72 Q 75 88, 70 72 L 60 72 Q 55 86, 50 72 L 40 72 Q 35 84, 30 72 L 20 72 Z",
               "M 18 68 L 82 68 L 82 72 Q 75 82, 70 72 L 60 72 Q 55 80, 50 72 L 40 72 Q 35 78, 30 72 L 20 72 Z"
            ]
         }}
         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path 
         fill="#F5A623" 
         opacity="0.5"
         animate={{ 
            d: [
               "M 25 72 Q 30 76, 35 72 L 45 72 Q 50 78, 55 72 Z",
               "M 25 72 Q 30 80, 35 72 L 45 72 Q 50 82, 55 72 Z",
               "M 25 72 Q 30 76, 35 72 L 45 72 Q 50 78, 55 72 Z"
            ]
         }}
         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      
      {/* Lettuce */}
      <motion.path 
         d="M 12 65 Q 25 50, 35 65 T 55 65 T 75 65 T 88 65 L 80 68 L 20 68 Z" 
         fill="#7ED321" 
         animate={{ y: [0, 1, 0] }}
         transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Tomatos */}
      <rect x="25" y="60" width="50" height="6" rx="3" fill="#D0021B" />
      <rect x="30" y="60" width="40" height="6" rx="3" fill="#FF2D55" />
      
      {/* Top Bun with Breathing/Bouncing */}
      <motion.g
         animate={{ y: [-2, 2, -2] }}
         transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
         <path d="M 15 60 Q 50 10, 85 60 Z" fill="url(#bun-grad)" />
         <path d="M 25 55 Q 50 25, 75 55 Z" fill="#F8E71C" opacity="0.1" /> {/* Bun shine */}
         
         {/* Seeds */}
         <g fill="#FFF8DC">
            <ellipse cx="35" cy="45" rx="1.5" ry="3.5" transform="rotate(30 35 45)" />
            <ellipse cx="50" cy="40" rx="1.5" ry="3.5" />
            <ellipse cx="65" cy="45" rx="1.5" ry="3.5" transform="rotate(-30 65 45)" />
            <ellipse cx="40" cy="50" rx="1.5" ry="3.5" transform="rotate(15 40 50)" />
            <ellipse cx="60" cy="52" rx="1.5" ry="3.5" transform="rotate(-15 60 52)" />
            <ellipse cx="50" cy="30" rx="1.5" ry="3.5" transform="rotate(10 50 30)" />
            <ellipse cx="28" cy="52" rx="1.5" ry="3.5" transform="rotate(45 28 52)" />
            <ellipse cx="72" cy="54" rx="1.5" ry="3.5" transform="rotate(-45 72 54)" />
         </g>
      </motion.g>
    </motion.g>
  </svg>
);

const FriesIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
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
      {/* Back Fries */}
      <motion.rect x="30" y="25" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
      <motion.rect x="42" y="20" width="8" height="45" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.2 }} />
      <motion.rect x="54" y="28" width="8" height="35" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} />
      <motion.rect x="66" y="22" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.1 }} />
      
      {/* Front Fries */}
      <motion.rect x="25" y="35" width="8" height="35" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -3.5, 0] }} transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }} />
      <motion.rect x="36" y="30" width="8" height="45" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -5.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="48" y="25" width="8" height="50" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }} />
      <motion.rect x="60" y="32" width="8" height="40" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -2, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 }} />
      <motion.rect x="71" y="38" width="8" height="30" rx="3" fill="url(#fry-grad)" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.1 }} />

      {/* Spicy Dust/Masala (Bouncing around) */}
      {[...Array(8)].map((_, i) => (
         <motion.circle 
            key={i}
            cx={35 + Math.random() * 30} 
            cy={25 + Math.random() * 20} 
            r={1.5} 
            fill="#D0021B" 
            animate={{ 
               y: [0, -5 - Math.random() * 5, 0], 
               opacity: [0, 1, 0] 
            }} 
            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }} 
         />
      ))}

      {/* Cup */}
      <path d="M 20 55 L 80 55 L 70 90 Q 50 95, 30 90 Z" fill="url(#cup-grad)" stroke="#FF2D55" strokeWidth="1" />
      <path d="M 25 55 L 75 55 L 67 90 Q 50 93, 33 90 Z" fill="#D0021B" />
      {/* Cup Shine */}
      <path d="M 40 65 Q 50 60, 60 65 T 50 80 Z" fill="#FFF" opacity="0.3" filter="blur(2px)" />
      
      {/* Smiley Face / Logo on Cup */}
      <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
         <path d="M 45 75 Q 50 80, 55 75" fill="none" stroke="#F8E71C" strokeWidth="2.5" strokeLinecap="round" />
         <circle cx="45" cy="70" r="1.5" fill="#F8E71C" />
         <circle cx="55" cy="70" r="1.5" fill="#F8E71C" />
      </motion.g>
    </motion.g>
  </svg>
);

const WrapIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
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
      {/* Tortilla Outer */}
      <path d="M 25 20 L 75 20 Q 85 50, 75 80 L 25 80 Q 15 50, 25 20 Z" fill="url(#wrap-grad)" stroke="#CD853F" strokeWidth="2" />
      
      {/* Sizzling Grill Marks */}
      <motion.g
         animate={{ opacity: [0.6, 1, 0.6] }}
         transition={{ duration: 1.5, repeat: Infinity }}
      >
         <line x1="32" y1="30" x2="68" y2="30" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
         <line x1="28" y1="45" x2="72" y2="45" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
         <line x1="28" y1="60" x2="72" y2="60" stroke="#8B572A" strokeWidth="3" strokeLinecap="round" />
      </motion.g>

      {/* Filling (Lettuce, Meat, Sauce) peaking out */}
      <path d="M 30 20 Q 50 -5, 70 20 Z" fill="#7ED321" />
      <path d="M 35 20 Q 50 0, 65 20 Z" fill="#5E3013" />
      <motion.path 
         d="M 40 20 Q 50 10, 60 20 Z" 
         fill="#D0021B" 
         animate={{ y: [0, -3, 0] }}
         transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.circle cx="45" cy="18" r="3" fill="#F8E71C" animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="55" cy="19" r="2.5" fill="#F8E71C" animate={{ y: [0, 2, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />

      {/* Wrapper Foil */}
      <path d="M 22 50 L 78 50 L 70 85 Q 50 90, 30 85 Z" fill="url(#foil-grad)" />
      {/* Foil Highlights */}
      <path d="M 30 50 L 30 85" stroke="#FFF" strokeWidth="2" opacity="0.6" />
      <path d="M 45 50 L 45 88" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <path d="M 60 50 L 60 85" stroke="#FFF" strokeWidth="3" opacity="0.5" />
    </motion.g>
  </svg>
);

const PastaIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
       <linearGradient id="plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BDBDBD" />
       </linearGradient>
       <radialGradient id="sauce-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D0021B" />
          <stop offset="100%" stopColor="#900000" />
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
      {/* Plate */}
      <ellipse cx="50" cy="75" rx="45" ry="18" fill="url(#plate-grad)" stroke="#9B9B9B" strokeWidth="2" />
      <ellipse cx="50" cy="73" rx="38" ry="14" fill="#F5F5F5" />
      
      {/* Pasta Base */}
      <path d="M 20 70 Q 50 30, 80 70 Z" fill="#F8E71C" stroke="#F5A623" strokeWidth="2" />
      
      {/* Detailed Pasta Noodles / Macaroni */}
      <g stroke="#F5A623" strokeWidth="5" strokeLinecap="round" fill="none">
         <motion.path d="M 30 60 Q 40 45, 50 60" animate={{ d: ["M 30 60 Q 40 45, 50 60", "M 30 60 Q 40 40, 50 60", "M 30 60 Q 40 45, 50 60"] }} transition={{ duration: 2, repeat: Infinity }} />
         <motion.path d="M 45 50 Q 55 35, 65 50" animate={{ d: ["M 45 50 Q 55 35, 65 50", "M 45 50 Q 55 30, 65 50", "M 45 50 Q 55 35, 65 50"] }} transition={{ duration: 2.5, repeat: Infinity }} />
         <path d="M 55 65 Q 70 50, 75 65" />
         <path d="M 25 65 Q 40 50, 50 70" />
         <path d="M 40 70 Q 55 60, 70 70" />
         <path d="M 35 55 Q 50 40, 60 55" />
      </g>

      {/* Red Sauce (Bubbling) */}
      <motion.path 
         d="M 35 55 Q 50 45, 65 55 Q 60 68, 50 65 Q 40 68, 35 55 Z" 
         fill="url(#sauce-grad)" opacity="0.9"
         animate={{ transform: ["scale(1)", "scale(1.05)", "scale(1)"] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         style={{ transformOrigin: "50px 55px" }}
      />
      <motion.path 
         d="M 30 62 Q 35 55, 45 65 Z" 
         fill="url(#sauce-grad)" opacity="0.9" 
      />
      <motion.path 
         d="M 55 62 Q 65 55, 70 65 Z" 
         fill="url(#sauce-grad)" opacity="0.9" 
      />
      
      {/* Falling Cheese Sprinkles */}
      {[...Array(6)].map((_, i) => (
         <motion.circle 
            key={i}
            cx={40 + Math.random() * 20} 
            cy={45 + Math.random() * 15} 
            r={1.5} 
            fill="#FFF" 
            animate={{ 
               y: [0, 10, 0], 
               opacity: [0, 1, 0] 
            }} 
            transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }} 
         />
      ))}

      {/* Basil Leaf */}
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

const DealIcon = () => (
  <svg width="140" height="140" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
     <DropShadow />
     <motion.g
       animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0, -10, 0] }}
       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
       style={{ transformOrigin: "center" }}
     >
       {/* Explosion / Starburst - Outer */}
       <motion.path 
          d="M 50 0 L 60 25 L 85 15 L 70 40 L 100 50 L 70 60 L 85 85 L 60 75 L 50 100 L 40 75 L 15 85 L 30 60 L 0 50 L 30 40 L 15 15 L 40 25 Z" 
          fill="#D0021B" 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
       />
       {/* Explosion / Starburst - Inner */}
       <motion.path 
          d="M 50 10 L 58 30 L 80 22 L 65 42 L 90 50 L 65 58 L 80 78 L 58 70 L 50 90 L 42 70 L 20 78 L 35 58 L 10 50 L 35 42 L 20 22 L 42 30 Z" 
          fill="#F5A623" 
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
       />
       {/* Core */}
       <circle cx="50" cy="50" r="22" fill="#F8E71C" stroke="#FFFFFF" strokeWidth="3" />
       
       {/* Text */}
       <text x="50" y="52" fontFamily="Impact, Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#D0021B" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '1px' }}>HOT</text>
       
       {/* Sparkles */}
       <motion.circle cx="20" cy="20" r="3" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1, repeat: Infinity }} />
       <motion.circle cx="80" cy="80" r="3" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }} />
       <motion.circle cx="85" cy="30" r="2" fill="#FFF" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
     </motion.g>
  </svg>
);

export const AnimatedFoodIcon = ({ categoryId }: { categoryId: string }) => {
   // ID prefixes: p = pizza, b = burger, w = wrap, f = fries, pr = paratha, ps = pasta, d = deal
   const prefix = categoryId.replace(/[0-9]/g, '');
   
   switch(prefix) {
      case 'p': return <PizzaIcon />;
      case 'b': return <BurgerIcon />;
      case 'f': return <FriesIcon />;
      case 'w':
      case 'pr': return <WrapIcon />;
      case 'ps': return <PastaIcon />;
      case 'd': return <DealIcon />;
      default: return <DealIcon />;
   }
};
