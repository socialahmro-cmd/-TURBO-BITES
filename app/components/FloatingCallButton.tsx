"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCallButton = () => {
   const phoneNumber = "+923101777790"; // From the checkout logic

   return (
      <a 
         href={`tel:${phoneNumber}`}
         className="position-fixed"
         style={{ 
            bottom: '30px', 
            left: '30px', 
            zIndex: 9999,
            textDecoration: 'none'
         }}
      >
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
         >
            {/* Outer Ripple Effect */}
            <motion.div
               className="position-absolute rounded-circle"
               style={{ 
                  top: '-10px', left: '-10px', right: '-10px', bottom: '-10px',
                  background: 'rgba(228, 0, 43, 0.4)',
                  zIndex: -1
               }}
               animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <svg width="70" height="70" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}>
               <defs>
                  <linearGradient id="phone-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#FF2D55" />
                     <stop offset="100%" stopColor="#D0021B" />
                  </linearGradient>
               </defs>
               
               {/* Button Background */}
               <circle cx="50" cy="50" r="45" fill="url(#phone-bg)" stroke="#FFF" strokeWidth="3" />
               
               {/* Ringing Phone Icon */}
               <motion.g
                  animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  style={{ transformOrigin: "center" }}
               >
                  <path 
                     d="M 35 30 Q 50 15, 65 30 L 75 40 Q 80 45, 75 50 L 65 60 Q 60 65, 55 60 L 50 55 Q 40 65, 50 75 L 55 70 Q 60 65, 65 70 L 75 80 Q 80 85, 75 90 L 65 100 Q 50 85, 35 70 Q 20 55, 30 40 L 40 30 Z" 
                     fill="#FFF" 
                     transform="scale(0.5) translate(40, 30)"
                  />
                  {/* Sound waves */}
                  <motion.path d="M 65 35 Q 70 40, 65 45" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                  <motion.path d="M 70 30 Q 80 40, 70 50" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
               </motion.g>
               
               {/* Call Now Text Badge */}
               <g transform="translate(50, 85)">
                  <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#FFF" />
                  <text x="0" y="4" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#D0021B" textAnchor="middle">CALL NOW</text>
               </g>
            </svg>
         </motion.div>
      </a>
   );
};
