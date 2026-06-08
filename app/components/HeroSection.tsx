"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowRight, FaArrowLeft, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { menuData } from '../../data/menu';
import { AnimatedFoodIcon } from './AnimatedFoodIcon';

export const HeroSection = ({ scrollToMenu }: { scrollToMenu?: () => void }) => {
   const [step, setStep] = useState(1);
   const [orderData, setOrderData] = useState<any>({
      category: null,
      item: null,
      size: null,
      qty: 1,
      name: '',
      phone: '',
      address: '',
      instructions: ''
   });

   const categories = [
      { name: 'Pizza', id: 'section-pizzas', iconId: 'p', data: menuData.pizzas },
      { name: 'Burgers', id: 'section-burgers', iconId: 'b', data: menuData.burgers },
      { name: 'Wraps', id: 'section-wraps', iconId: 'w', data: menuData.wraps },
      { name: 'Fries', id: 'section-fries', iconId: 'f', data: menuData.fries },
      { name: 'Parathas', id: 'section-parathas', iconId: 'pr', data: menuData.parathas },
      { name: 'Pasta', id: 'section-pasta', iconId: 'ps', data: menuData.pasta },
      { name: 'Deals', id: 'section-deals', iconId: 'd', data: menuData.deals }
   ];

   const handleNext = () => setStep(s => s + 1);
   const handleBack = () => setStep(s => Math.max(1, s - 1));

   const getPrice = () => {
      if (!orderData.item) return 0;
      if (orderData.item.prices && orderData.size) {
         return orderData.item.prices[orderData.size] * orderData.qty;
      }
      return (orderData.item.price || 0) * orderData.qty;
   };

   const formatSize = (s: string) => {
      const m: Record<string, string> = { 'S': 'Small', 'M': 'Medium', 'L': 'Large', 'XL': 'Extra Large', 'Half': 'Half', 'Full': 'Full' };
      return m[s] || s;
   };

   const submitToWhatsApp = () => {
      const { item, size, qty, name, phone, address, instructions } = orderData;
      const total = getPrice();
      let msg = `*NEW ORDER FROM TURBO BITES*\n\n`;
      msg += `*Item:* ${qty}x ${item.name} ${size ? `(${formatSize(size)})` : ''}\n`;
      msg += `*Total:* Rs. ${total}\n\n`;
      msg += `*Customer:* ${name}\n`;
      msg += `*Phone:* ${phone}\n`;
      msg += `*Address:* ${address}\n`;
      if (instructions) msg += `*Notes:* ${instructions}\n`;
      
      const phoneNum = "+923101777790";
      window.open(`https://wa.me/${phoneNum.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank');
      setStep(7);
   };

   return (
      <section className="container position-relative z-1" style={{ paddingTop: '160px', paddingBottom: '3rem' }}>
         <div className="row align-items-center min-vh-75">
            {/* Column 1: Marketing & CTA */}
            <div className="col-12 col-lg-6 mb-5 mb-lg-0 pe-lg-5">
               <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6 }}
               >
                  <div className="d-flex align-items-center gap-2 mb-3">
                     <div className="d-flex text-warning fs-5">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                     </div>
                     <span className="text-light fw-bold">4.9/5 from 2,000+ Happy Foodies</span>
                  </div>
                  
                  <h1 className="font-bebas text-white display-2 lh-1 mb-4" style={{ letterSpacing: '2px' }}>
                     SATISFY YOUR CRAVINGS AT <span className="text-ember">TURBO BITES!</span>
                  </h1>
                  
                  <p className="text-light opacity-75 fs-5 mb-5 lh-base" style={{ maxWidth: '500px' }}>
                     Experience the finest handcrafted pizzas, flame-grilled burgers, and explosive flavors, delivered piping hot to your door in Attock.
                  </p>
                  
                  <div className="d-flex gap-3">
                     <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-ember rounded-pill px-5 py-3 fs-5 fw-bold font-barlow d-flex align-items-center gap-2 shadow-lg"
                        onClick={() => {
                           if (step !== 1) setStep(1);
                           // Optional scroll logic could be added here
                        }}
                     >
                        ORDER NOW <FaArrowRight />
                     </motion.button>
                     
                     {scrollToMenu && (
                        <button onClick={scrollToMenu} className="btn btn-outline-light rounded-pill px-5 py-3 fs-5 fw-bold font-barlow">
                           VIEW FULL MENU
                        </button>
                     )}
                  </div>
               </motion.div>
            </div>

            {/* Column 2: 6-Step Order Form */}
            <div className="col-12 col-lg-6">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="solid-card p-4 p-md-5 rounded-4 border shadow-lg position-relative overflow-hidden"
                  style={{ borderColor: 'rgba(255,255,255,0.05)', minHeight: '550px' }}
               >
                  {/* Progress Bar */}
                  <div className="position-absolute top-0 start-0 w-100 bg-dark" style={{ height: '6px' }}>
                     <motion.div 
                        className="h-100 bg-ember" 
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / 6) * 100}%` }}
                        transition={{ duration: 0.3 }}
                     />
                  </div>
                  
                  <AnimatePresence mode="wait">
                     {/* STEP 1: CATEGORY */}
                     {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                           <h3 className="font-barlow text-white fw-bold mb-4">What are you craving?</h3>
                           <div className="row g-3">
                              {categories.map(cat => (
                                 <div className="col-4 col-sm-3 text-center" key={cat.name}>
                                    <motion.div 
                                       whileHover={{ scale: 1.05, borderColor: '#E4002B' }}
                                       className="p-3 rounded-3 border h-100 d-flex flex-column align-items-center justify-content-center"
                                       style={{ cursor: 'pointer', borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}
                                       onClick={() => {
                                          setOrderData({ ...orderData, category: cat, item: null, size: null });
                                          handleNext();
                                       }}
                                    >
                                       <AnimatedFoodIcon categoryId={cat.iconId} itemName="Generic" size={60} />
                                       <span className="text-white mt-2 fw-bold" style={{ fontSize: '0.8rem' }}>{cat.name}</span>
                                    </motion.div>
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     )}

                     {/* STEP 2: ITEM SELECTION */}
                     {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-100 d-flex flex-column">
                           <div className="d-flex align-items-center gap-3 mb-4">
                              <button className="btn btn-outline-light rounded-circle p-2" onClick={handleBack}><FaArrowLeft /></button>
                              <h3 className="font-barlow text-white fw-bold mb-0">Choose your {orderData.category?.name}</h3>
                           </div>
                           <div className="row g-3 overflow-auto hide-scrollbar pb-2" style={{ maxHeight: '400px' }}>
                              {orderData.category?.data.slice(0, 10).map((item: any) => (
                                 <div className="col-6 text-center" key={item.id}>
                                    <motion.div 
                                       whileHover={{ scale: 1.05, borderColor: '#E4002B' }}
                                       className={`p-3 rounded-3 border h-100 d-flex flex-column align-items-center justify-content-center ${orderData.item?.id === item.id ? 'border-danger bg-danger bg-opacity-10' : ''}`}
                                       style={{ cursor: 'pointer', borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}
                                       onClick={() => {
                                          const defSize = item.prices ? Object.keys(item.prices)[0] : null;
                                          setOrderData({ ...orderData, item, size: defSize, qty: 1 });
                                       }}
                                    >
                                       <AnimatedFoodIcon categoryId={orderData.category.iconId} itemName={item.name} size={70} />
                                       <span className="text-white mt-2 fw-bold" style={{ fontSize: '0.9rem', lineHeight: 1.2 }}>{item.name}</span>
                                       <span className="text-ember fw-bold mt-1">Rs. {item.prices ? Object.values(item.prices)[0] as number : item.price}</span>
                                    </motion.div>
                                 </div>
                              ))}
                           </div>
                           <div className="mt-4 mt-auto">
                              <button 
                                 className="btn btn-ember w-100 rounded-pill py-3 fw-bold font-barlow text-uppercase fs-5"
                                 disabled={!orderData.item}
                                 onClick={handleNext}
                              >
                                 Continue
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {/* STEP 3: CUSTOMIZATION */}
                     {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                           <div className="d-flex align-items-center gap-3 mb-4">
                              <button className="btn btn-outline-light rounded-circle p-2" onClick={handleBack}><FaArrowLeft /></button>
                              <h3 className="font-barlow text-white fw-bold mb-0">Customize</h3>
                           </div>
                           
                           <div className="bg-dark rounded-4 p-4 border mb-4 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                              <AnimatedFoodIcon categoryId={orderData.category.iconId} itemName={orderData.item.name} size={120} />
                              <h4 className="text-white fw-bold mt-3">{orderData.item.name}</h4>
                           </div>

                           {orderData.item.prices && (
                              <div className="mb-4">
                                 <label className="text-light opacity-75 fw-bold mb-2 text-uppercase font-barlow">Select Size</label>
                                 <div className="d-flex gap-2 flex-wrap">
                                    {Object.keys(orderData.item.prices).map(sz => (
                                       <button 
                                          key={sz}
                                          className={`btn fw-bold px-4 rounded-pill ${orderData.size === sz ? 'btn-ember text-white' : 'btn-outline-light'}`}
                                          onClick={() => setOrderData({ ...orderData, size: sz })}
                                       >
                                          {formatSize(sz)} - Rs. {orderData.item.prices[sz]}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}

                           <div className="mb-4 d-flex align-items-center justify-content-between">
                              <label className="text-light opacity-75 fw-bold text-uppercase font-barlow mb-0">Quantity</label>
                              <div className="d-flex align-items-center bg-dark rounded-pill px-2 py-1">
                                 <button className="btn btn-sm btn-dark text-white rounded-circle fs-5" onClick={() => setOrderData({...orderData, qty: Math.max(1, orderData.qty - 1)})}>-</button>
                                 <span className="mx-3 text-white fw-bold fs-5">{orderData.qty}</span>
                                 <button className="btn btn-sm btn-dark text-white rounded-circle fs-5" onClick={() => setOrderData({...orderData, qty: orderData.qty + 1})}>+</button>
                              </div>
                           </div>

                           <div className="mt-4">
                              <button className="btn btn-ember w-100 rounded-pill py-3 fw-bold font-barlow text-uppercase fs-5 d-flex justify-content-between align-items-center px-4" onClick={handleNext}>
                                 <span>Continue to Details</span>
                                 <span>Rs. {getPrice()}</span>
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {/* STEP 4: CONTACT INFO */}
                     {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                           <div className="d-flex align-items-center gap-3 mb-4">
                              <button className="btn btn-outline-light rounded-circle p-2" onClick={handleBack}><FaArrowLeft /></button>
                              <h3 className="font-barlow text-white fw-bold mb-0">Your Details</h3>
                           </div>

                           <div className="mb-3">
                              <label className="text-light mb-2 fw-bold font-barlow text-uppercase">Full Name</label>
                              <input 
                                 type="text" 
                                 className="form-control form-control-lg bg-dark text-white border-secondary border-opacity-25 p-3 rounded-3"
                                 placeholder="Enter your name"
                                 value={orderData.name}
                                 onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                              />
                           </div>
                           
                           <div className="mb-4">
                              <label className="text-light mb-2 fw-bold font-barlow text-uppercase">Phone Number</label>
                              <input 
                                 type="tel" 
                                 className="form-control form-control-lg bg-dark text-white border-secondary border-opacity-25 p-3 rounded-3"
                                 placeholder="03XX XXXXXXX"
                                 value={orderData.phone}
                                 onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                              />
                           </div>

                           <button 
                              className="btn btn-ember w-100 rounded-pill py-3 fw-bold font-barlow text-uppercase fs-5"
                              disabled={!orderData.name || !orderData.phone}
                              onClick={handleNext}
                           >
                              Continue to Delivery
                           </button>
                        </motion.div>
                     )}

                     {/* STEP 5: DELIVERY */}
                     {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                           <div className="d-flex align-items-center gap-3 mb-4">
                              <button className="btn btn-outline-light rounded-circle p-2" onClick={handleBack}><FaArrowLeft /></button>
                              <h3 className="font-barlow text-white fw-bold mb-0">Delivery Info</h3>
                           </div>

                           <div className="mb-3">
                              <label className="text-light mb-2 fw-bold font-barlow text-uppercase">Delivery Address</label>
                              <textarea 
                                 className="form-control bg-dark text-white border-secondary border-opacity-25 p-3 rounded-3"
                                 rows={3}
                                 placeholder="House #, Street, Block, Area (Attock)"
                                 value={orderData.address}
                                 onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                              />
                           </div>
                           
                           <div className="mb-4">
                              <label className="text-light mb-2 fw-bold font-barlow text-uppercase">Special Instructions <span className="opacity-50 text-lowercase fw-normal">(Optional)</span></label>
                              <input 
                                 type="text" 
                                 className="form-control bg-dark text-white border-secondary border-opacity-25 p-3 rounded-3"
                                 placeholder="Extra spicy, no mayo, etc."
                                 value={orderData.instructions}
                                 onChange={(e) => setOrderData({ ...orderData, instructions: e.target.value })}
                              />
                           </div>

                           <button 
                              className="btn btn-ember w-100 rounded-pill py-3 fw-bold font-barlow text-uppercase fs-5"
                              disabled={!orderData.address}
                              onClick={handleNext}
                           >
                              Review Order
                           </button>
                        </motion.div>
                     )}

                     {/* STEP 6: REVIEW & WHATSAPP */}
                     {step === 6 && (
                        <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                           <div className="d-flex align-items-center gap-3 mb-4">
                              <button className="btn btn-outline-light rounded-circle p-2" onClick={handleBack}><FaArrowLeft /></button>
                              <h3 className="font-barlow text-white fw-bold mb-0">Order Summary</h3>
                           </div>

                           <div className="bg-dark rounded-4 p-4 border mb-4 position-relative" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                              <div className="d-flex align-items-center gap-3 mb-3">
                                 <AnimatedFoodIcon categoryId={orderData.category.iconId} itemName={orderData.item.name} size={50} />
                                 <div>
                                    <h5 className="text-white fw-bold mb-0">{orderData.qty}x {orderData.item.name}</h5>
                                    {orderData.size && <span className="text-light opacity-75 small">{formatSize(orderData.size)}</span>}
                                 </div>
                                 <h4 className="text-ember fw-bold ms-auto mb-0">Rs. {getPrice()}</h4>
                              </div>
                              <hr className="border-secondary border-opacity-25" />
                              <div className="text-light opacity-75 small mb-1"><strong>Name:</strong> {orderData.name}</div>
                              <div className="text-light opacity-75 small mb-1"><strong>Phone:</strong> {orderData.phone}</div>
                              <div className="text-light opacity-75 small"><strong>Address:</strong> {orderData.address}</div>
                           </div>

                           <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn w-100 rounded-pill py-3 fw-bold font-barlow text-uppercase fs-5 d-flex justify-content-center align-items-center gap-2 border-0"
                              style={{ background: 'linear-gradient(90deg, #128C7E, #25D366)', color: 'white' }}
                              onClick={submitToWhatsApp}
                           >
                              <FaWhatsapp className="fs-3" /> SEND ORDER VIA WHATSAPP
                           </motion.button>
                        </motion.div>
                     )}

                     {/* STEP 7: THANK YOU */}
                     {step === 7 && (
                        <motion.div key="step7" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
                           <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1 }}>
                              <FaCheckCircle className="text-success display-1 mb-4" />
                           </motion.div>
                           <h2 className="font-bebas text-white mb-2">Order Sent!</h2>
                           <p className="text-light opacity-75 mb-4">We've redirected you to WhatsApp to confirm your order details. Prepare your cravings!</p>
                           <button className="btn btn-outline-light rounded-pill px-4 py-2" onClick={() => { setStep(1); setOrderData({ category: null, item: null, size: null, qty: 1, name: '', phone: '', address: '', instructions: '' }); }}>
                              Start New Order
                           </button>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </div>
         </div>
      </section>
   );
};
