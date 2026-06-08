"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaMapMarkerAlt, FaClock, FaTimes, FaPlus, FaMinus, FaTrash, FaSearch, FaFrown, FaArrowUp, FaBars, FaArrowLeft, FaArrowRight, FaMicrophone } from 'react-icons/fa';
import { menuData } from '../data/menu';
import { AnimatedFoodIcon } from './components/AnimatedFoodIcon';
import { FloatingCallButton } from './components/FloatingCallButton';

const formatSize = (s: string) => {
   const m: Record<string, string> = { 'S': 'Small', 'M': 'Medium', 'L': 'Large', 'XL': 'Extra Large', 'Half': 'Half', 'Full': 'Full' };
   return m[s] || s;
};

const ProductCard = ({ item, setCart, setToastMessage, addToCart }: any) => {
   const defaultSize = item.prices ? Object.keys(item.prices)[0] : undefined;
   const [selectedSize, setSelectedSize] = useState<string | undefined>(defaultSize);

   const currentPrice = item.prices ? item.prices[selectedSize!] : item.price;
   
   return (
      <div className="col-12 col-md-6 col-lg-4">
         <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover="hover"
            className="card solid-card h-100 p-4 rounded-4 d-flex flex-column position-relative overflow-hidden"
         >
            {/* SVG Animated Border */}
            <motion.svg className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" style={{ zIndex: 0 }}>
               <motion.rect x="0" y="0" width="100%" height="100%" rx="16" ry="16" fill="none" stroke="#E4002B" strokeWidth="4" initial={{ pathLength: 0, opacity: 0 }} variants={{ hover: { pathLength: 1, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } } }} />
            </motion.svg>
            
            <div className="position-relative d-flex flex-column h-100" style={{ zIndex: 1 }}>
               {/* Subtle red top accent for brand feel */}
               <div className="position-absolute top-0 start-0 w-100 bg-ember" style={{ height: '4px', top: '-1.5rem', left: '-1.5rem', width: 'calc(100% + 3rem)' }}></div>
               
               <div className="d-flex justify-content-center mb-3">
                  <AnimatedFoodIcon categoryId={item.id} itemName={item.name} />
               </div>
               <div className="d-flex justify-content-between align-items-start mb-2">
                 <h4 className="font-barlow text-white fw-bold m-0 fs-4 tracking-tight">{item.name}</h4>
               </div>
               {item.desc && <p className="text-light opacity-75 small mb-4 flex-grow-1" style={{ lineHeight: '1.5' }}>{item.desc}</p>}
               
               {item.prices && (
                  <div className="mb-4 mt-auto">
                    <div className="d-flex gap-2 flex-wrap">
                       {Object.keys(item.prices).map(size => (
                          <button 
                             key={size}
                             onClick={() => setSelectedSize(size)}
                             className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${selectedSize === size ? 'btn-ember text-white' : 'btn-outline-secondary text-light opacity-75'}`}
                             style={{ transition: 'all 0.2s', borderWidth: '2px', borderColor: selectedSize === size ? 'var(--bs-primary)' : 'rgba(255,255,255,0.1)' }}
                          >
                             {formatSize(size)}
                          </button>
                       ))}
                    </div>
                  </div>
               )}
               
               <div className={!item.prices && !item.desc ? "mt-auto pt-3 d-flex flex-column gap-2 border-top" : "pt-3 d-flex flex-column gap-2 border-top"} style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                     <span className="fw-bold text-uppercase text-light opacity-75" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                        {item.prices ? formatSize(selectedSize!) : 'REGULAR'}
                     </span>
                     <span className="font-bebas fs-4 text-white mb-0">Rs. {currentPrice}</span>
                  </div>
                  <motion.button 
                     whileHover={{ scale: 1.02 }} 
                     whileTap={{ scale: 0.95 }} 
                     onClick={() => {
                        if (item.prices && selectedSize) {
                           setCart((prev: any) => {
                              const existing = prev.find((i: any) => i.id === item.id && i.size === selectedSize);
                              if (existing) return prev.map((i: any) => i.id === item.id && i.size === selectedSize ? { ...i, qty: i.qty + 1 } : i);
                              return [...prev, { ...item, qty: 1, priceToUse: currentPrice, size: selectedSize }];
                           });
                           const expandedSize = formatSize(selectedSize);
                           setToastMessage(`Added ${item.name} (${expandedSize}) to basket!`);
                           setTimeout(() => setToastMessage(""), 3000);
                        } else {
                           addToCart(item);
                        }
                     }} 
                     className="btn btn-ember w-100 rounded-pill py-2 fw-bold text-uppercase font-barlow d-flex justify-content-center align-items-center gap-2 shadow-sm"
                  >
                     <FaPlus /> Add to Order
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [fomoSeconds, setFomoSeconds] = useState(15 * 60);
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        if (!isSearchExpanded) setIsSearchExpanded(true);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setToastMessage("Voice search is not supported in this browser.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkStoreStatus = () => {
      const hours = new Date().getHours();
      // Store open from 10 AM to 4 AM. Closed from 4 AM to 10 AM.
      setIsStoreOpen(!(hours >= 4 && hours < 10));
    };
    checkStoreStatus();
    const statusTimer = setInterval(checkStoreStatus, 60000);
    
    const fomoTimer = setInterval(() => {
      setFomoSeconds(prev => prev > 0 ? prev - 1 : 15 * 60);
    }, 1000);
    
    return () => {
      clearInterval(statusTimer);
      clearInterval(fomoTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartOpen) {
      setCheckoutStep(1);
    }
  }, [cartOpen]);

  const addToCart = (item: any) => {
    let basePrice = item.price;
    let sizeLabel = "";
    if (item.prices) {
       const firstSize = Object.keys(item.prices)[0];
       basePrice = item.prices[firstSize];
       sizeLabel = firstSize;
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === sizeLabel);
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === sizeLabel ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, priceToUse: basePrice, size: sizeLabel }];
    });
    
    setToastMessage(`Added ${item.name} to basket!`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const updateQty = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].qty += delta;
      if (newCart[index].qty <= 0) newCart.splice(index, 1);
      return newCart;
    });
  };

  const removeItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const totalBill = cart.reduce((sum, item) => sum + (item.priceToUse * item.qty), 0);

  const processOrderCheckout = () => {
    if (cart.length === 0) {
      alert("Your basket is empty!");
      return;
    }
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in your Name, Phone, and Delivery Address.");
      return;
    }

    let msg = `*NEW ORDER FROM TURBO BITES*\n\n`;
    msg += `*Customer Details:*\n`;
    msg += `Name: ${customer.name}\n`;
    msg += `Phone: ${customer.phone}\n`;
    msg += `Address: ${customer.address}\n\n`;
    msg += `*Order Items:*\n`;
    
    cart.forEach(item => {
      let sizeStr = item.size ? ` (${item.size})` : '';
      msg += `▪ ${item.qty}x ${item.name}${sizeStr} - Rs. ${item.priceToUse * item.qty}\n`;
    });

    msg += `\n*TOTAL BILL: Rs. ${totalBill}*\n`;
    
    const DESTINATION_PHONE = "923101777790";
    const waUrl = `https://wa.me/${DESTINATION_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const renderSection = (title: string, items: any[], id: string) => {
    const filteredItems = items.filter(item => 
       item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filteredItems.length === 0) return null;

    return (
      <div id={id} className="solid-panel rounded-5 p-4 p-md-5 mb-5" style={{ scrollMarginTop: '120px' }}>
        <h2 className="font-bebas display-5 text-white pb-3 mb-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)', letterSpacing: '1px' }}>{title}</h2>
        <motion.div className="row g-4"
           initial="hidden"
           animate="visible"
           variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {filteredItems.map((item: any) => (
             <ProductCard key={item.id} item={item} setCart={setCart} setToastMessage={setToastMessage} addToCart={addToCart} />
          ))}
        </motion.div>
     </div>
    );
  };

  const handleCategoryClick = (categoryName: string) => {
     setSearchQuery(""); // clear search on category click to show everything
     setActiveCategory(categoryName);
     if (menuRef.current) {
        // slightly offset for fixed navbar
        const y = menuRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
     }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const val = e.target.value;
     setSearchQuery(val);
     // Auto-scroll to menu when user starts searching
     if (val.length === 1 && menuRef.current) {
        const y = menuRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
     }
  };

  const allItems = [
     ...menuData.pizzas, ...menuData.burgers, ...menuData.wraps, 
     ...menuData.fries, ...menuData.parathas, ...menuData.pasta, ...menuData.deals
  ];
  const searchHasResults = allItems.some((item: any) => 
     item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main>
      <header className="fixed-top w-100" style={{ zIndex: 1000 }}>
         {/* Top Bar Marquee */}
         <div className="bg-dark text-light py-2 shadow-sm overflow-hidden border-bottom" style={{ fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.05)' }}>
            <motion.div 
               className="d-flex whitespace-nowrap"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ ease: "linear", duration: 25, repeat: Infinity }}
               style={{ width: "max-content" }}
            >
               {/* Duplicate content for infinite seamless loop */}
               {[...Array(2)].map((_, i) => (
                  <div key={i} className="d-flex align-items-center gap-4 gap-md-5 px-3 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                     <span className="d-flex align-items-center gap-2">
                        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>⚡</motion.span> 
                        <span className="text-ember">Fast Delivery</span>
                     </span>
                     <span className="d-flex align-items-center gap-2">
                        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🍔</motion.span> 
                        Popular Items
                     </span>
                     <span className="d-flex align-items-center gap-2 opacity-75">
                        <FaClock className="text-ember" /> 
                        10:00 AM - 04:00 AM
                     </span>
                     <span className="d-flex align-items-center gap-2 opacity-75">
                        <FaMapMarkerAlt className="text-ember" /> 
                        Kamra Road, Attock
                     </span>
                     <span className="d-flex align-items-center gap-2">
                        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1 }}>🚀</motion.span> 
                        Attock's Finest Fast Food
                     </span>
                  </div>
               ))}
            </motion.div>
         </div>

         <motion.nav 
            className="navbar navbar-dark py-2 py-md-3 position-relative" 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ 
               background: isScrolled ? 'rgba(15, 15, 15, 0.95)' : 'rgba(15, 15, 15, 0.7)',
               backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
               borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
               transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s'
            }}
         >
           <div className="container-fluid px-2 px-md-4 d-flex align-items-center justify-content-between position-relative">
             <div className="d-flex align-items-center gap-1 gap-md-2">
                <button className="btn btn-link text-light d-lg-none p-0 me-1 border-0 shadow-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                   <FaBars className="fs-4" />
                </button>
                <a className="navbar-brand m-0" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <img src="/turbo-bites-logo.svg" alt="Turbo Bites Fast Food" style={{ height: '55px', objectFit: 'contain' }} />
                </a>
             </div>
             
             {/* Desktop Centered Links */}
             <div className="d-none d-lg-flex gap-4 font-barlow-cond fw-bold text-uppercase position-absolute top-50 start-50 translate-middle" style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>
                {[
                  { name: 'Pizza', id: 'section-pizzas', iconId: 'p', items: menuData.pizzas },
                  { name: 'Burgers', id: 'section-burgers', iconId: 'b', items: menuData.burgers },
                  { name: 'Wraps', id: 'section-wraps', iconId: 'w', items: menuData.wraps },
                  { name: 'Fries', id: 'section-fries', iconId: 'f', items: menuData.fries },
                  { name: 'Parathas', id: 'section-parathas', iconId: 'pr', items: menuData.parathas },
                  { name: 'Pasta', id: 'section-pasta', iconId: 'ps', items: menuData.pasta }
                ].map((topCat) => (
                   <div key={topCat.name} className="position-relative" onMouseEnter={() => setHoveredCategory(topCat.name)} onMouseLeave={() => setHoveredCategory(null)}>
                      <a href="#" className="text-light text-decoration-none nav-link-hover d-flex align-items-center gap-1 py-3" onClick={(e) => { e.preventDefault(); handleCategoryClick(topCat.name); }}>
                         {topCat.name.toUpperCase()}
                      </a>
                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                         {hoveredCategory === topCat.name && (
                            <motion.div 
                               initial={{ opacity: 0, y: 15 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, y: 15 }}
                               transition={{ duration: 0.2 }}
                               className="position-absolute start-50 translate-middle-x solid-panel rounded-4 p-4 shadow-lg border"
                               style={{ top: '100%', width: topCat.items.length > 4 ? '850px' : '600px', borderColor: 'rgba(255,255,255,0.1)', cursor: 'default' }}
                            >
                               <div className="row g-3">
                                  {topCat.items.map((item) => (
                                     <div className="col-3 text-center" key={item.id}>
                                        <motion.div 
                                           whileHover={{ scale: 1.05, borderColor: '#E4002B' }}
                                           className="p-2 rounded-3 border h-100 d-flex flex-column justify-content-center"
                                           style={{ cursor: 'pointer', borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}
                                           onClick={() => {
                                              handleCategoryClick(topCat.name);
                                              setHoveredCategory(null);
                                           }}
                                        >
                                           <div className="d-flex justify-content-center mb-1">
                                              <AnimatedFoodIcon categoryId={topCat.iconId} itemName={item.name} size={60} />
                                           </div>
                                           <div className="text-white mt-2" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>{item.name}</div>
                                        </motion.div>
                                     </div>
                                  ))}
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                ))}
                <div className="position-relative">
                   <a href="#" className="text-light text-decoration-none nav-link-hover py-3 d-block" onClick={(e) => { e.preventDefault(); handleCategoryClick('Deals'); }}>DEALS</a>
                </div>
             </div>

             <div className="d-flex align-items-center gap-1 gap-md-3">
               {/* Expanding Search Component */}
               <div className="position-relative">
                  <motion.div 
                     className="d-flex align-items-center bg-dark rounded-pill border overflow-hidden position-relative"
                     animate={{ 
                        width: isSearchExpanded ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '140px' : '300px') : '36px',
                        borderColor: isSearchFocused ? 'rgba(228, 0, 43, 0.5)' : 'rgba(255,255,255,0.1)'
                     }}
                     style={{ height: '36px', transition: 'border-color 0.3s', zIndex: 10 }}
                  >
                     <div 
                        className="d-flex align-items-center justify-content-center text-light" 
                        style={{ width: '36px', height: '36px', cursor: 'pointer', flexShrink: 0 }}
                        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                     >
                        <motion.svg 
                           width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                           animate={{ rotate: isSearchFocused ? [0, -10, 10, 0] : 0 }}
                        >
                           <circle cx="11" cy="11" r="8"></circle>
                           <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </motion.svg>
                     </div>
                     <AnimatePresence>
                        {isSearchExpanded && (
                           <>
                              <motion.input 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 type="text" 
                                 className="form-control bg-transparent border-0 text-white shadow-none fw-bold p-0 pe-1" 
                                 placeholder="Search..." 
                                 value={searchQuery}
                                 onChange={handleSearchChange}
                                 onFocus={() => setIsSearchFocused(true)}
                                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                 style={{ fontSize: '0.95rem', minWidth: '0' }}
                                 autoFocus
                              />
                              <motion.div
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 className="pe-3 d-flex align-items-center justify-content-center"
                                 style={{ cursor: 'pointer', zIndex: 20 }}
                                 onMouseDown={(e) => {
                                    e.preventDefault(); // prevent blur
                                    startVoiceSearch();
                                 }}
                              >
                                 <motion.div
                                    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                 >
                                    <FaMicrophone className={`fs-6 ${isListening ? 'text-danger' : 'text-light opacity-50 nav-link-hover'}`} />
                                 </motion.div>
                              </motion.div>
                           </>
                        )}
                     </AnimatePresence>
                  </motion.div>

                  {/* Search Suggestions Dropdown */}
                  <AnimatePresence>
                    {isSearchFocused && searchQuery && (
                      <motion.div 
                         initial={{ opacity: 0, y: -10 }} 
                         animate={{ opacity: 1, y: 0 }} 
                         exit={{ opacity: 0, y: -10 }}
                         className="position-absolute mt-2 end-0"
                         style={{ width: '350px', zIndex: 50 }}
                      >
                         <div className="solid-panel bg-dark rounded-4 shadow-lg overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)', maxHeight: '300px', overflowY: 'auto' }}>
                            {allItems
                               .filter((item: any) => 
                                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                               )
                               .slice(0, 5)
                               .map((item: any) => (
                                  <div 
                                     key={item.id} 
                                     className="d-flex align-items-center gap-3 p-3 border-bottom search-suggestion"
                                     style={{ borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s' }}
                                     onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
                                     onClick={() => {
                                        setSearchQuery(item.name);
                                        setIsSearchFocused(false);
                                        setIsSearchExpanded(false);
                                     }}
                                  >
                                     <span className="fs-3">{item.emoji}</span>
                                     <div className="text-start flex-grow-1">
                                        <h6 className="text-white fw-bold mb-0">{item.name}</h6>
                                        <small className="text-light opacity-50">Rs. {item.price || (item.prices && Object.values(item.prices)[0] as number)}</small>
                                     </div>
                                     <button 
                                        className="btn btn-sm btn-ember rounded-pill px-3 fw-bold shadow-sm"
                                        onClick={(e) => {
                                           e.stopPropagation();
                                           addToCart(item);
                                           setIsSearchFocused(false);
                                        }}
                                     >
                                        + ADD
                                     </button>
                                  </div>
                               ))
                            }
                            {searchHasResults ? (
                               <div className="p-2 text-center">
                                  <small className="text-ember fw-bold">Press Enter to see all results</small>
                               </div>
                            ) : (
                               <div className="p-4 text-center">
                                  <span className="text-light opacity-50">No items found for "{searchQuery}"</span>
                               </div>
                            )}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-ember fw-bold d-flex align-items-center gap-1 gap-md-2 rounded-pill px-2 py-1 px-md-4 py-md-2 shadow-lg" 
                  style={{ border: '2px solid transparent' }} 
                  onClick={() => setCartOpen(true)}
               >
                 <FaShoppingCart className="fs-6 fs-md-5" /> 
                 <span className="d-none d-sm-inline fs-5 font-bebas tracking-wide" style={{ letterSpacing: '1px' }}>BASKET</span>
                 <span className="badge rounded-circle ms-1 px-2 py-1 bg-white text-ember shadow-sm" style={{ fontSize: '0.8rem', transform: 'translateY(-1px)' }}>
                    {cart.reduce((s, i) => s + i.qty, 0)}
                 </span>
               </motion.button>
             </div>
           </div>
         </motion.nav>

         {/* Mobile Menu Drawer Overlay */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="position-fixed top-0 start-0 w-75 h-100 bg-dark border-end"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', zIndex: 1050 }}
               >
                  <div className="p-4 h-100 d-flex flex-column">
                     <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="font-bebas fs-3 text-white"><span className="text-ember">TURBO</span> BITES</span>
                        <button className="btn btn-sm btn-outline-light border-0" onClick={() => setIsMobileMenuOpen(false)}><FaTimes className="fs-4" /></button>
                     </div>
                     <div className="d-flex flex-column gap-2 overflow-auto hide-scrollbar">
                        {[
                           { name: 'Pizza', id: 'section-pizzas', emoji: '🍕' },
                           { name: 'Burgers', id: 'section-burgers', emoji: '🍔' },
                           { name: 'Wraps', id: 'section-wraps', emoji: '🌯' },
                           { name: 'Fries', id: 'section-fries', emoji: '🍟' },
                           { name: 'Parathas', id: 'section-parathas', emoji: '🫓' },
                           { name: 'Pasta', id: 'section-pasta', emoji: '🍝' }
                        ].map(cat => (
                           <button key={cat.name} className="btn btn-dark text-start border-0 py-3 fs-5 fw-bold text-uppercase d-flex align-items-center gap-3 rounded-3 mb-1" style={{ background: 'rgba(255,255,255,0.03)' }} onClick={() => { handleCategoryClick(cat.name); setIsMobileMenuOpen(false); }}>
                              <span className="fs-3">{cat.emoji}</span> {cat.name}
                           </button>
                        ))}
                        <hr className="text-light opacity-25 my-3" />
                        <button className="btn btn-dark text-start border-0 py-3 fs-5 fw-bold text-uppercase rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }} onClick={() => { handleCategoryClick('Deals'); setIsMobileMenuOpen(false); }}>
                           🔥 Top Deals
                        </button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
         
         {/* Mobile Menu Backdrop */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="position-fixed top-0 start-0 w-100 h-100 bg-black"
                  style={{ opacity: 0.5, zIndex: 1040 }}
                  onClick={() => setIsMobileMenuOpen(false)}
               />
            )}
         </AnimatePresence>
      </header>

      <section className="container" style={{ paddingTop: '160px', paddingBottom: '3rem' }} ref={menuRef}>
         
         {/* FOMO Animated Banner */}
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4 p-3 mb-5 shadow-sm d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 position-relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(255,90,0,0.15) 0%, rgba(255,90,0,0.02) 100%)', border: '1px solid rgba(255,90,0,0.2)' }}
         >
            {/* Animated background SVG effect */}
            <motion.svg className="position-absolute top-0 end-0 opacity-25" width="200" height="200" viewBox="0 0 200 200" fill="none" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} style={{ pointerEvents: 'none', right: '-50px', top: '-50px' }}>
               <circle cx="100" cy="100" r="80" stroke="var(--bs-primary)" strokeWidth="2" strokeDasharray="10 10" />
               <circle cx="100" cy="100" r="60" stroke="var(--bs-primary)" strokeWidth="1" strokeDasharray="5 5" />
            </motion.svg>

            <div className="d-flex align-items-center gap-3 position-relative z-1">
               <motion.div 
                  className="bg-ember text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                  style={{ width: '45px', height: '45px' }}
                  animate={isStoreOpen ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
               >
                  <FaClock className="fs-5" />
               </motion.div>
               <div>
                  <h5 className="font-barlow fw-bold text-light mb-0 text-uppercase">
                     {isStoreOpen ? "High Demand!" : "We Are Currently Closed"}
                  </h5>
                  <p className="text-light opacity-75 small mb-0 fw-bold">
                     {isStoreOpen ? "Order now to guarantee quick delivery" : "We open at 10:00 AM. Pre-plan your cravings!"}
                  </p>
               </div>
            </div>

            {isStoreOpen && (
               <div className="text-center position-relative z-1">
                  <div className="font-bebas text-ember display-5 lh-1 mb-1" style={{ letterSpacing: '2px' }}>
                     {Math.floor(fomoSeconds / 60).toString().padStart(2, '0')}:{(fomoSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-uppercase fw-bold small text-light opacity-50" style={{ letterSpacing: '1px' }}>Offer Expires In</div>
               </div>
            )}
         </motion.div>

         <AnimatePresence mode="popLayout">
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Pizza') && (
              <motion.div key="pizza" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Premium Handcrafted Pizzas", menuData.pizzas, "section-pizzas")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Burgers') && (
              <motion.div key="burgers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Flame Grilled Saucy Burgers", menuData.burgers, "section-burgers")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Wraps') && (
              <motion.div key="wraps" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Premium Tortilla Wraps", menuData.wraps, "section-wraps")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Fries') && (
              <motion.div key="fries" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Gourmet Loaded Fries", menuData.fries, "section-fries")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Parathas') && (
              <motion.div key="parathas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Fusion Parathas & Shawarma", menuData.parathas, "section-parathas")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Pasta') && (
              <motion.div key="pasta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Oven Baked Pasta Macaroni", menuData.pasta, "section-pasta")}
              </motion.div>
           )}
           {(searchQuery || activeCategory === 'All' || activeCategory === 'Deals') && (
              <motion.div key="deals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 {renderSection("Fried Combo Deals & Bundles", menuData.deals, "section-deals")}
              </motion.div>
           )}
         </AnimatePresence>

         {searchQuery && searchHasResults && (
            <div className="text-center text-muted mt-4">
               End of search results.
            </div>
         )}

         {searchQuery && !searchHasResults && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5">
               <FaFrown className="display-1 text-muted mb-4 opacity-50" />
               <h3 className="text-white font-bebas display-6">No items found matching "{searchQuery}"</h3>
               <p className="text-muted">Try searching for something else like "Pizza" or "Spicy".</p>
               <button className="btn btn-outline-amber rounded-pill px-4 py-2 mt-3 fw-bold" onClick={() => setSearchQuery("")}>
                  Clear Search
               </button>
            </motion.div>
         )}
      </section>

      <footer className="bg-midnight text-center py-5 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <h2 className="font-bebas display-4 text-gradient mb-3">TURBO BITES</h2>
        <p className="text-white fw-bold mx-auto mb-2" style={{ maxWidth: '500px', opacity: 0.8 }}>Experience flavor at max speed! Crave-worthy fast food prepared fresh every single night.</p>
        <p className="text-muted small mt-4">near Aslam Marwat Hospital Kamra road Attock</p>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="position-fixed top-0 start-0 w-100 h-100" 
               style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1040, backdropFilter: 'blur(8px)' }}
               onClick={() => setCartOpen(false)}
            />
            <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="position-fixed top-0 end-0 h-100 bg-white border-start d-flex flex-column shadow-lg"
               style={{ width: 'min(500px, 100vw)', zIndex: 1050 }}
            >
              <div className="p-4 border-bottom d-flex flex-column gap-3 bg-white shadow-sm position-relative z-3">
                 <div className="d-flex justify-content-between align-items-center">
                   <h3 className="font-bebas fs-2 text-dark mb-0 d-flex align-items-center gap-2">
                     {checkoutStep > 1 && (
                        <button className="btn btn-sm btn-light rounded-circle me-1 d-flex align-items-center justify-content-center border" style={{ width: '35px', height: '35px' }} onClick={() => setCheckoutStep(checkoutStep - 1)}>
                           <FaArrowLeft />
                        </button>
                     )}
                     <FaShoppingCart className="text-ember" /> Checkout
                   </h3>
                   <button className="btn btn-light fs-5 rounded-circle p-2 d-flex align-items-center justify-content-center border-0 text-dark" style={{ width: '40px', height: '40px', background: '#f0f0f0' }} onClick={() => setCartOpen(false)}><FaTimes /></button>
                 </div>
                 
                 {/* SVG Progress Tracker */}
                 <div className="position-relative d-flex justify-content-between align-items-center px-1">
                    <div className="position-absolute top-50 start-0 w-100 bg-light rounded" style={{ height: '4px', transform: 'translateY(-50%)', zIndex: 0 }}>
                       <motion.div className="bg-ember h-100 rounded" initial={{ width: '0%' }} animate={{ width: `${((checkoutStep - 1) / 3) * 100}%` }} transition={{ duration: 0.4 }} />
                    </div>
                    {[1, 2, 3, 4].map(step => (
                       <motion.div 
                          key={step} 
                          className={`rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm ${checkoutStep >= step ? 'bg-ember text-white' : 'bg-white text-muted border'}`}
                          style={{ width: '28px', height: '28px', zIndex: 1, fontSize: '0.85rem' }}
                          animate={checkoutStep === step ? { scale: [1, 1.15, 1], boxShadow: ['0 0 0px rgba(228,0,43,0)', '0 0 15px rgba(228,0,43,0.6)', '0 0 0px rgba(228,0,43,0)'] } : {}}
                          transition={{ repeat: checkoutStep === step ? Infinity : 0, duration: 1.5 }}
                       >
                          {step}
                       </motion.div>
                    ))}
                 </div>
              </div>

              <div className="flex-grow-1 overflow-hidden position-relative bg-light">
                 <AnimatePresence mode="wait">
                    {checkoutStep === 1 && (
                       <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 d-flex flex-column gap-3 h-100 overflow-auto">
                          <h5 className="fw-bold text-dark mb-2">1. Review Basket</h5>
                          {cart.length === 0 ? (
                             <div className="text-center mt-5">
                               <FaShoppingCart className="display-1 text-muted mb-3 opacity-25" />
                               <p className="text-muted fw-bold fs-5">Your basket is empty.</p>
                             </div>
                          ) : (
                             cart.map((item, index) => (
                                <div key={index} className="card rounded-4 p-3 border-0 shadow-sm mb-3 bg-white">
                                   <div className="d-flex justify-content-between align-items-start mb-3">
                                      <div>
                                         <h5 className="text-dark font-barlow fw-bold mb-1 fs-4">{item.name}</h5>
                                         {item.size && <span className="badge mt-1 px-2 py-1 text-dark" style={{ background: '#ffc107' }}>{item.size}</span>}
                                      </div>
                                      <button className="btn btn-sm text-danger fs-5 opacity-75 hover-opacity-100" onClick={() => removeItem(index)}><FaTrash /></button>
                                   </div>
                                   <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center gap-3 rounded-pill px-3 py-2" style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}>
                                         <button className="btn btn-sm text-dark p-0 fs-5" onClick={() => updateQty(index, -1)}><FaMinus /></button>
                                         <span className="text-dark fs-5 fw-bold">{item.qty}</span>
                                         <button className="btn btn-sm text-dark p-0 fs-5" onClick={() => updateQty(index, 1)}><FaPlus /></button>
                                      </div>
                                      <span className="font-bebas fs-3 text-ember">Rs. {item.priceToUse * item.qty}</span>
                                   </div>
                                </div>
                             ))
                          )}
                       </motion.div>
                    )}

                    {checkoutStep === 2 && (
                       <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 h-100 d-flex flex-column overflow-auto">
                          <h5 className="fw-bold text-dark mb-4">2. Personal Details</h5>
                          <div className="d-flex flex-column gap-3">
                             <div>
                                <label className="form-label fw-bold text-muted small text-uppercase">Your Name *</label>
                                <input type="text" className="form-control border-0 py-3 rounded-3 text-dark fw-bold fs-5 shadow-sm" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #e9ecef' }} placeholder="e.g. John Doe" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                             </div>
                             <div>
                                <label className="form-label fw-bold text-muted small text-uppercase">Phone Number *</label>
                                <input type="tel" className="form-control border-0 py-3 rounded-3 text-dark fw-bold fs-5 shadow-sm" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #e9ecef' }} placeholder="e.g. 0300 1234567" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {checkoutStep === 3 && (
                       <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 h-100 d-flex flex-column overflow-auto">
                          <h5 className="fw-bold text-dark mb-4">3. Delivery Details</h5>
                          <div className="d-flex flex-column gap-3">
                             <div>
                                <label className="form-label fw-bold text-muted small text-uppercase">Street Address / Block *</label>
                                <textarea className="form-control border-0 py-3 rounded-3 text-dark fw-bold fs-5 shadow-sm" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #e9ecef' }} rows={4} placeholder="e.g. House 123, Street 4, Block B, Kamra Road..." value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})}></textarea>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {checkoutStep === 4 && (
                       <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 h-100 d-flex flex-column overflow-auto">
                          <h5 className="fw-bold text-dark mb-4">4. Review & Confirm</h5>
                          <div className="card border-0 shadow-sm rounded-4 mb-4">
                             <div className="card-body bg-white rounded-4">
                                <h6 className="fw-bold text-uppercase text-muted mb-3 border-bottom pb-2">Order Summary</h6>
                                {cart.map((item, idx) => (
                                   <div key={idx} className="d-flex justify-content-between mb-2 small fw-bold text-dark">
                                      <span>{item.qty}x {item.name}</span>
                                      <span>Rs. {item.priceToUse * item.qty}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                          <div className="card border-0 shadow-sm rounded-4">
                             <div className="card-body bg-white rounded-4">
                                <h6 className="fw-bold text-uppercase text-muted mb-3 border-bottom pb-2">Delivery Details</h6>
                                <p className="mb-1 text-dark fw-bold">{customer.name}</p>
                                <p className="mb-1 text-dark fw-bold">{customer.phone}</p>
                                <p className="mb-0 text-muted small">{customer.address}</p>
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              <div className="p-4 bg-white border-top shadow-lg position-relative z-3">
                 <div className="d-flex justify-content-between align-items-center rounded-4 p-3 mb-4" style={{ background: 'rgba(255,51,0,0.05)', border: '1px solid rgba(255,51,0,0.2)' }}>
                    <span className="fw-bold text-uppercase text-dark fs-5">Total Bill</span>
                    <span className="font-bebas display-4 text-ember mb-0">Rs. {totalBill}</span>
                 </div>

                 {checkoutStep === 1 && (
                    <button className="btn btn-dark w-100 py-3 rounded-pill font-barlow fs-5 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 shadow" onClick={() => {
                       if (cart.length === 0) {
                          alert("Your basket is empty!");
                          return;
                       }
                       setCheckoutStep(2);
                    }}>
                       Next: Personal Details <FaArrowRight />
                    </button>
                 )}

                 {checkoutStep === 2 && (
                    <button className="btn btn-dark w-100 py-3 rounded-pill font-barlow fs-5 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 shadow" onClick={() => {
                       if (!customer.name.trim() || !customer.phone.trim()) {
                          alert("Please provide your name and phone number.");
                          return;
                       }
                       setCheckoutStep(3);
                    }}>
                       Next: Delivery Address <FaArrowRight />
                    </button>
                 )}

                 {checkoutStep === 3 && (
                    <button className="btn btn-dark w-100 py-3 rounded-pill font-barlow fs-5 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 shadow" onClick={() => {
                       if (!customer.address.trim()) {
                          alert("Please provide your delivery address.");
                          return;
                       }
                       setCheckoutStep(4);
                    }}>
                       Next: Review Order <FaArrowRight />
                    </button>
                 )}

                 {checkoutStep === 4 && (
                    <button className="btn btn-ember pulse-btn w-100 py-3 rounded-pill font-bebas fs-4 text-uppercase text-white d-flex align-items-center justify-content-center gap-2 shadow" onClick={processOrderCheckout}>
                       🚀 Transmit Order To WhatsApp
                    </button>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
         {toastMessage && (
            <motion.div 
               initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 50, x: '-50%' }}
               className="position-fixed bottom-0 start-50 mb-4 px-4 py-3 solid-panel text-white rounded-pill fw-bold shadow-lg d-flex align-items-center gap-2"
               style={{ zIndex: 1100, border: '1px solid var(--bs-primary)' }}
            >
               <span className="text-ember fs-5">✓</span> {toastMessage}
            </motion.div>
         )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-ember rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
            style={{ width: '50px', height: '50px', bottom: '30px', right: '30px', zIndex: 1040 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <FloatingCallButton />
    </main>
  );
}
