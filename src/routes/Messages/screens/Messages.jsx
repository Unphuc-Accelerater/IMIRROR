import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FooterNavBar } from "../../../components/FooterNavBar";

export const Messages = () => {
  const navigate = useNavigate();
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMessages = localStorage.getItem("feedbackMessages");
    if (storedMessages) {
      setFeedbackMessages(JSON.parse(storedMessages));
    }
    setLoading(false);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#74a4ee]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] min-h-screen relative overflow-hidden pb-20">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <motion.button
            className="absolute left-4 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Messages</h1>
        </div>

        {/* Messages List */}
        <div className="w-[350px] mx-auto mt-[80px] space-y-4">
          {feedbackMessages.length === 0 ? (
            <motion.div
              className="bg-white rounded-[20px] shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">No Feedback Received Yet</h2>
              <p className="text-gray-600 text-sm">
                Share your feedback forms with friends and family to start receiving anonymous insights!
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {feedbackMessages.map((message) => (
                <motion.div
                  key={message.id}
                  className="bg-white rounded-[20px] shadow-md p-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-xl">💬</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-[#333] text-base">Anonymous Feedback</h3>
                      <p className="text-xs text-gray-500">{message.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{message.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
      <FooterNavBar />
    </div>
  );
};
