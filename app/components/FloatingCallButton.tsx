"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCallButton = () => {
   const phoneNumber = "+923101777790"; // From the checkout logic

   return (
      <div className="position-fixed d-flex flex-column gap-3" style={{ bottom: '30px', left: '30px', zIndex: 9999 }}>
         
         {/* WhatsApp Button */}
         <a 
            href={`https://wa.me/${phoneNumber.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
         >
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 260, damping: 20 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               className="position-relative"
            >
               <motion.div
                  className="position-absolute rounded-circle"
                  style={{ top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', background: 'rgba(37, 211, 102, 0.4)', zIndex: -1 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               />
               <svg width="70" height="70" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}>
                  <defs>
                     <linearGradient id="wa-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#25D366" />
                        <stop offset="100%" stopColor="#128C7E" />
                     </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#wa-bg)" stroke="#FFF" strokeWidth="3" />
                  <motion.g
                     animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                     transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                     style={{ transformOrigin: "center" }}
                  >
                     <path 
                        d="M 50 20 C 33.4 20 20 33.4 20 50 C 20 56.6 22.1 62.7 25.6 67.8 L 22 80 L 34.6 76.7 C 39.4 79.5 44.5 81 50 81 C 66.6 81 80 67.6 80 51 C 80 34.4 66.6 20 50 20 Z" 
                        fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                     />
                     <path
                        d="M 40 40 C 40 38 42 36 44 36 C 45 36 46 37 47 39 C 48 41 50 45 50 46 C 51 47 50 48 49 49 C 48 50 47 51 46 52 C 45 53 46 55 47 56 C 50 60 54 62 57 64 C 58 64 60 63 61 62 C 62 61 63 60 64 60 C 65 60 69 62 70 63 C 71 64 71 65 71 66 C 71 68 69 70 67 70 C 65 70 60 69 55 64 C 47 56 42 48 40 43 C 39 42 40 41 40 40 Z"
                        fill="#FFF"
                     />
                  </motion.g>
                  <g transform="translate(50, 85)">
                     <rect x="-35" y="-10" width="70" height="20" rx="10" fill="#FFF" />
                     <text x="0" y="4" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#128C7E" textAnchor="middle">WHATSAPP</text>
                  </g>
               </svg>
            </motion.div>
         </a>

         {/* Call Button */}
         <a 
            href={`tel:${phoneNumber}`}
            className="text-decoration-none"
         >
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 260, damping: 20 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               className="position-relative"
            >
               <motion.div
                  className="position-absolute rounded-circle"
                  style={{ top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', background: 'rgba(228, 0, 43, 0.4)', zIndex: -1 }}
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
                  <circle cx="50" cy="50" r="45" fill="url(#phone-bg)" stroke="#FFF" strokeWidth="3" />
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
                     <motion.path d="M 65 35 Q 70 40, 65 45" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                     <motion.path d="M 70 30 Q 80 40, 70 50" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </motion.g>
                  <g transform="translate(50, 85)">
                     <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#FFF" />
                     <text x="0" y="4" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#D0021B" textAnchor="middle">CALL NOW</text>
                  </g>
               </svg>
            </motion.div>
         </a>
      </div>
   );
};
