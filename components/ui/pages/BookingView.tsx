
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  make: string;
  model: string;
  year: string;
  timeSlot: string;
}

interface FormErrors {
  email?: string;
  mobile?: string;
  year?: string;
}

export const BookingView: React.FC = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    address: '',
    make: '',
    model: '',
    year: '',
    timeSlot: 'Morning (08:00 - 12:00)'
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    
    // Prevent going before current month
    if (newDate < today && newDate.getMonth() !== today.getMonth()) return;

    setViewDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newSelectedDate);
  };

  const isPrevDisabled = 
    currentYear === today.getFullYear() && 
    currentMonth === today.getMonth();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Mobile Validation (At least 10 digits)
    const mobileClean = formData.mobile.replace(/\D/g, '');
    if (mobileClean.length < 10) {
      errors.mobile = "Please enter a valid mobile number (min 10 digits).";
      isValid = false;
    }

    // Vehicle Year Validation (4 digits, reasonable range)
    const yearNum = parseInt(formData.year);
    const nextYear = new Date().getFullYear() + 1;
    if (!/^\d{4}$/.test(formData.year) || yearNum < 1900 || yearNum > nextYear) {
      errors.year = "Please enter a valid 4-digit vehicle year.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Close form modal and open confirmation modal
      setShowModal(false);
      setShowConfirmation(true);
      
      // Here you would typically send data to backend
      console.log("Submitting booking:", formData, selectedDate);
    }
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-8 flex flex-col items-center relative">
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-2xl w-full"
       >
         <h1 className="text-5xl font-light mb-12 text-center text-gray-900 dark:text-white">Secure Your <span className="text-teal font-serif italic">Slot</span></h1>
         
         <div className="bg-white dark:bg-obsidian border border-teal/20 p-8 shadow-[0_0_30px_rgba(0,229,210,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-50"></div>
            
            {/* Calendar UI */}
            <div className="mb-8 select-none">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-gray-900 dark:text-white text-lg font-light tracking-widest uppercase">
                   {monthNames[currentMonth]} <span className="text-teal">{currentYear}</span>
                 </h3>
                 <div className="flex gap-2">
                   <button 
                     onClick={handlePrevMonth}
                     disabled={isPrevDisabled}
                     className={`w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 transition-colors
                       ${isPrevDisabled 
                         ? 'opacity-20 cursor-not-allowed text-gray-500' 
                         : 'hover:border-teal text-gray-900 dark:text-white hover:text-teal'}`}
                   >
                     &lt;
                   </button>
                   <button 
                     onClick={handleNextMonth}
                     className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-teal text-gray-900 dark:text-white transition-colors hover:text-teal"
                   >
                     &gt;
                   </button>
                 </div>
               </div>

               <div className="grid grid-cols-7 gap-2 mb-2">
                 {['S','M','T','W','T','F','S'].map(d => (
                   <div key={d} className="text-center text-xs text-gray-500 dark:text-gray-600 font-bold">{d}</div>
                 ))}
               </div>

               <div className="grid grid-cols-7 gap-2">
                 {/* Empty slots for start of month */}
                 {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                   <div key={`empty-${i}`} />
                 ))}

                 {/* Days */}
                 {Array.from({ length: daysInMonth }).map((_, i) => {
                   const day = i + 1;
                   const dateObj = new Date(currentYear, currentMonth, day);
                   const isPast = dateObj < today;
                   const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
                   
                   return (
                     <button 
                       key={day} 
                       disabled={isPast}
                       onClick={() => handleDateClick(day)}
                       className={`aspect-square flex items-center justify-center text-sm border transition-all duration-300 relative group
                         ${isPast 
                           ? 'border-transparent text-gray-300 dark:text-gray-800 opacity-20 cursor-not-allowed bg-black/5 dark:bg-white/5' 
                           : isSelected
                             ? 'border-teal bg-teal text-obsidian shadow-[0_0_15px_#00E5D2]'
                             : 'border-black/5 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-teal hover:text-teal'
                         }`}
                     >
                       {day}
                       {!isPast && !isSelected && (
                         <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       )}
                     </button>
                   );
                 })}
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-4 border border-black/10 dark:border-white/10 min-h-[80px]">
                  {selectedDate ? (
                    <>
                      <div className="w-2 h-2 bg-teal rounded-full shadow-[0_0_10px_#00E5D2]"></div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Selected Date</div>
                        <div className="text-lg text-gray-900 dark:text-white">
                          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 italic">Select a date from the calendar to proceed.</div>
                    </>
                  )}
               </div>
               <Button 
                 className={`w-full ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                 disabled={!selectedDate}
                 onClick={() => setShowModal(true)}
               >
                 Confirm Reservation
               </Button>
            </div>
         </div>
         
         <p className="text-center text-xs text-gray-500 dark:text-gray-600 mt-8 uppercase tracking-widest">
           No payment required until completion of service.
         </p>
       </motion.div>

       {/* Client Details Modal */}
       <AnimatePresence>
         {showModal && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
             onClick={(e) => { if(e.target === e.currentTarget) setShowModal(false) }}
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="bg-white dark:bg-obsidian w-full max-w-lg border border-teal/30 shadow-[0_0_50px_rgba(0,229,210,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]"
             >
                {/* Header */}
                <div className="p-8 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex justify-between items-start">
                   <div>
                     <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">Finalize <span className="text-teal font-serif italic">Details</span></h2>
                     <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                     </p>
                   </div>
                   <button 
                     onClick={() => setShowModal(false)}
                     className="text-gray-400 hover:text-red-500 transition-colors"
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M18 6L6 18M6 6l12 12" />
                     </svg>
                   </button>
                </div>

                {/* Form */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">First Name</label>
                        <input 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          required 
                          type="text" 
                          className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors rounded-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Last Name</label>
                        <input 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                          required 
                          type="text" 
                          className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors rounded-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Mobile Number</label>
                        <input 
                          name="mobile" 
                          value={formData.mobile} 
                          onChange={handleInputChange} 
                          required 
                          type="tel" 
                          className={`w-full bg-transparent border-b py-2 text-gray-900 dark:text-white focus:outline-none transition-colors rounded-none ${formErrors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-teal'}`}
                        />
                        {formErrors.mobile && <p className="text-[10px] text-red-500">{formErrors.mobile}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Email Address</label>
                        <input 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                          type="email" 
                          className={`w-full bg-transparent border-b py-2 text-gray-900 dark:text-white focus:outline-none transition-colors rounded-none ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-teal'}`}
                        />
                         {formErrors.email && <p className="text-[10px] text-red-500">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Service Address</label>
                      <input 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        placeholder="Street, Apt, City, Zip" 
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors rounded-none placeholder-gray-400 dark:placeholder-gray-600" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Vehicle Make</label>
                          <input 
                            name="make" 
                            value={formData.make} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="e.g. Porsche" 
                            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors rounded-none" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Vehicle Model</label>
                          <input 
                            name="model" 
                            value={formData.model} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="e.g. 911 GT3" 
                            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors rounded-none" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Vehicle Year</label>
                          <input 
                            name="year" 
                            value={formData.year} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="e.g. 2024" 
                            className={`w-full bg-transparent border-b py-2 text-gray-900 dark:text-white focus:outline-none transition-colors rounded-none ${formErrors.year ? 'border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-teal'}`}
                          />
                           {formErrors.year && <p className="text-[10px] text-red-500">{formErrors.year}</p>}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-gray-500">Preferred Time Slot</label>
                       <div className="grid grid-cols-2 gap-4">
                          <label className="border border-black/10 dark:border-white/10 p-3 flex items-center gap-3 cursor-pointer hover:border-teal transition-colors">
                             <input type="radio" name="time" className="accent-teal" defaultChecked />
                             <span className="text-sm text-gray-700 dark:text-gray-300">Morning (08:00 - 12:00)</span>
                          </label>
                          <label className="border border-black/10 dark:border-white/10 p-3 flex items-center gap-3 cursor-pointer hover:border-teal transition-colors">
                             <input type="radio" name="time" className="accent-teal" />
                             <span className="text-sm text-gray-700 dark:text-gray-300">Afternoon (13:00 - 17:00)</span>
                          </label>
                       </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full">Initialize Service Request</Button>
                    </div>
                  </form>
                </div>
             </motion.div>
           </motion.div>
         )}

         {/* Confirmation Modal */}
         {showConfirmation && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
           >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="bg-white dark:bg-obsidian border border-teal/50 p-12 max-w-md w-full text-center shadow-[0_0_100px_rgba(0,229,210,0.2)] relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-teal"></div>
                 
                 {/* Success Icon */}
                 <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-teal/30 flex items-center justify-center relative">
                       <div className="absolute inset-0 bg-teal/10 rounded-full animate-ping opacity-20"></div>
                       <svg className="w-10 h-10 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <motion.path 
                            d="M20 6L9 17l-5-5" 
                            initial={{ pathLength: 0 }} 
                            animate={{ pathLength: 1 }} 
                            transition={{ duration: 0.8, delay: 0.3 }} 
                          />
                       </svg>
                    </div>
                 </div>

                 <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">Request <span className="font-serif italic text-teal">Received</span></h2>
                 
                 <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                   Your service protocol has been initiated. A confirmation transmission has been sent to <span className="text-teal">{formData.email}</span>.
                 </p>
                 
                 <p className="text-xs text-gray-500 uppercase tracking-widest mb-10">
                   Our concierge will contact you shortly to finalize deployment.
                 </p>

                 <Button onClick={() => setShowConfirmation(false)}>Acknowledge</Button>
              </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};
