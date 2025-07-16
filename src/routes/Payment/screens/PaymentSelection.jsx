import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VirtualKeyboard } from "../../../components/VirtualKeyboard";

export const PaymentSelection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null); // "card" or "upi"
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const activeInputRef = useRef(null);

  useEffect(() => {
    let enabled = false;
    if (selectedMethod === "card") {
      enabled =
        cardDetails.cardNumber.length === 16 &&
        cardDetails.expiryDate.length === 5 &&
        cardDetails.cvv.length === 3 &&
        cardDetails.cardholderName.trim() !== "";
    } else if (selectedMethod === "upi") {
      enabled = upiId.trim() !== "" && upiId.includes("@");
    }
    setIsPayButtonEnabled(enabled);
  }, [selectedMethod, cardDetails, upiId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpiInputChange = (e) => {
    setUpiId(e.target.value);
  };

  const handlePay = () => {
    if (isPayButtonEnabled) {
      // Simulate payment success
      navigate("/payment-success");
    }
  };

  const handleInputFocus = (fieldName, e) => {
    setActiveField(fieldName);
    setShowKeyboard(true);
    activeInputRef.current = e.target;
    
    // Scroll the input into view to avoid being hidden under keyboard
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleKeyPress = (key) => {
    if (!activeField || !activeInputRef.current) return;

    // Apply field-specific validation
    if (activeField === 'upiId') {
      setUpiId(prev => prev + key);
      activeInputRef.current.value = upiId + key;
    } else {
      // For card number, expiry date, and CVV - only allow numbers
      if ((activeField === 'cardNumber' || activeField === 'expiryDate' || activeField === 'cvv') && 
          !/^\d*$/.test(key)) {
        return; // Skip non-numeric input for these fields
      }
      
      // For expiry date, automatically add slash after MM
      if (activeField === 'expiryDate' && cardDetails.expiryDate.length === 2 && key !== '/') {
        setCardDetails(prev => ({
          ...prev,
          [activeField]: prev[activeField] + '/' + key
        }));
        activeInputRef.current.value = cardDetails.expiryDate + '/' + key;
      } else {
        setCardDetails(prev => ({
          ...prev,
          [activeField]: prev[activeField] + key
        }));
        activeInputRef.current.value = cardDetails[activeField] + key;
      }
    }
  };

  const handleBackspace = () => {
    if (!activeField || !activeInputRef.current) return;

    if (activeField === 'upiId') {
      const newValue = upiId.slice(0, -1);
      setUpiId(newValue);
      activeInputRef.current.value = newValue;
    } else {
      const newValue = cardDetails[activeField].slice(0, -1);
      setCardDetails(prev => ({
        ...prev,
        [activeField]: newValue
      }));
      activeInputRef.current.value = newValue;
    }
  };

  const handleCloseKeyboard = () => {
    setShowKeyboard(false);
    setActiveField(null);
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[#6e9de3] w-[381px] min-h-screen relative overflow-hidden">
        {/* Status Bar */}
        <div className="absolute w-full h-11 top-0 left-0 bg-transparent flex items-center justify-between px-4">
          <div className="text-white text-sm font-medium">9:41</div>
          <div className="flex items-center space-x-1">
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/mobile-signal-3@2x.png" alt="Mobile Signal" className="w-[18px] h-2.5" />
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/union-2.svg" alt="Wifi" className="w-[15px] h-[11px]" />
            <div className="w-[27px] h-[13px] border border-white rounded-[3px] flex items-center justify-center">
              <div className="w-5 h-2 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Header with Back Button and Amount */}
        <div className="absolute w-full h-[180px] top-0 left-0 flex flex-col items-center justify-center pt-10">
          <motion.button
            className="absolute top-8 left-6 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-white text-xl mt-4">Amount To Pay</h1>
          <p className="font-bold text-white text-4xl mt-2">$549</p>
        </div>

        {/* Main Content Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-6 px-6 pb-20 mt-[160px] relative overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 260px)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Account Section */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-lg mb-3">Account</h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Credit/Debit Card */}
              <motion.div
                className={`flex flex-col p-4 border-b border-gray-100 cursor-pointer ${selectedMethod === "card" ? "bg-blue-50 shadow-sm" : ""}`}
                whileHover={{ backgroundColor: "#f0f7ff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(selectedMethod === "card" ? null : "card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png"
                      alt="Credit Card"
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-black text-base font-medium">Credit/Debit Card</span>
                  </div>
                  <img
                    src="https://c.animaapp.com/md5feu4dyKLC8D/img/chevron-down.svg"
                    alt="Chevron Down"
                    className={`w-4 h-4 transition-transform ${selectedMethod === "card" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {selectedMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 overflow-hidden"
                    >
                      <div className="relative">
                        <input
                          type="tel"
                          inputMode="numeric"
                          name="cardNumber"
                          placeholder="Card Number"
                          maxLength="16"
                          value={cardDetails.cardNumber}
                          onChange={handleCardInputChange}
                          onFocus={(e) => handleInputFocus('cardNumber', e)}
                          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base"
                        />
                        <div className="absolute right-3 top-3">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/349/349221.png" 
                            alt="Card" 
                            className="w-6 h-6" 
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <input
                          type="tel"
                          inputMode="numeric"
                          name="expiryDate"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          onFocus={(e) => handleInputFocus('expiryDate', e)}
                          className="w-1/2 h-12 px-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base"
                        />
                        <input
                          type="tel"
                          inputMode="numeric"
                          name="cvv"
                          placeholder="CVV"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          onFocus={(e) => handleInputFocus('cvv', e)}
                          className="w-1/2 h-12 px-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base"
                        />
                      </div>
                      <input
                        type="text"
                        inputMode="text"
                        name="cardholderName"
                        placeholder="Cardholder Name"
                        value={cardDetails.cardholderName}
                        onChange={handleCardInputChange}
                        onFocus={(e) => handleInputFocus('cardholderName', e)}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pay by UPI */}
              <motion.div
                className={`flex flex-col p-4 cursor-pointer ${selectedMethod === "upi" ? "bg-blue-50 shadow-sm" : ""}`}
                whileHover={{ backgroundColor: "#f0f7ff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(selectedMethod === "upi" ? null : "upi")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8121/8121510.png"
                      alt="UPI"
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-black text-base font-medium">Pay by UPI</span>
                  </div>
                  <img
                    src="https://c.animaapp.com/md5feu4dyKLC8D/img/chevron-down.svg"
                    alt="Chevron Down"
                    className={`w-4 h-4 transition-transform ${selectedMethod === "upi" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {selectedMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="relative">
                        <input
                          type="email"
                          inputMode="email"
                          name="upiId"
                          placeholder="Enter UPI ID (e.g., example@bank)"
                          value={upiId}
                          onChange={handleUpiInputChange}
                          onFocus={(e) => handleInputFocus('upiId', e)}
                          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base"
                        />
                        <div className="absolute right-3 top-3">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/4128/4128461.png" 
                            alt="UPI" 
                            className="w-6 h-6" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
        <motion.button
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] h-12 rounded-[25px] text-white text-lg font-bold shadow-lg ${
            isPayButtonEnabled ? "bg-[#74a4ee]" : "bg-gray-300 cursor-not-allowed"
          }`}
          whileHover={isPayButtonEnabled ? { scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" } : {}}
          whileTap={isPayButtonEnabled ? { scale: 0.97 } : {}}
          onClick={handlePay}
          disabled={!isPayButtonEnabled}
        >
          Pay $549
        </motion.button>

        {/* Virtual Keyboard */}
        <AnimatePresence>
          {showKeyboard && (
            <VirtualKeyboard
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onClose={handleCloseKeyboard}
            />
          )}
        </AnimatePresence>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
