import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export const SessionDetails = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sessions from localStorage
    const storedSessions = localStorage.getItem("sessions");
    if (storedSessions) {
      const sessions = JSON.parse(storedSessions);
      const foundSession = sessions.find(s => s.id === sessionId);
      if (foundSession) {
        setSession(foundSession);
      }
    }
    setLoading(false);
  }, [sessionId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#74a4ee]"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Session Not Found</h2>
        <p className="text-gray-600 mb-6 text-center">The session you're looking for doesn't exist or has been removed.</p>
        <motion.button
          className="px-6 py-2 bg-[#74a4ee] text-white rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </motion.button>
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
          <h1 className="font-bold text-inkdarkest text-xl">Session Details</h1>
        </div>

        {/* Main Content */}
        <div className="w-[350px] mx-auto mt-[80px] space-y-6">
          {/* Therapist Info Card */}
          <motion.div
            className="bg-white rounded-[20px] shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 flex flex-col items-center">
              <img 
                src={session.therapist.image} 
                alt={session.therapist.name} 
                className="w-[100px] h-[100px] rounded-full object-cover mb-4 border-4 border-[#f0f7ff]"
              />
              <h2 className="text-xl font-bold text-[#333] mb-1">{session.therapist.name}</h2>
              <p className="text-gray-600 mb-3">{session.therapist.specialization}</p>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.status === "Upcoming" 
                    ? "bg-blue-100 text-blue-800" 
                    : session.status === "Completed" 
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {session.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Session Details Card */}
          <motion.div
            className="bg-white rounded-[20px] shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-[#333] mb-4">Session Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-[#333]">{session.date}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Time</span>
                <span className="font-medium text-[#333]">{session.time}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-medium text-[#333]">{session.id}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Booked On</span>
                <span className="font-medium text-[#333]">{formatDate(session.bookingDate)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  session.status === "Upcoming" 
                    ? "text-blue-600" 
                    : session.status === "Completed" 
                    ? "text-green-600"
                    : "text-gray-600"
                }`}>
                  {session.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="bg-white rounded-[20px] shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-[#333] mb-4">Actions</h3>
            
            <div className="space-y-3">
              <motion.button
                className="w-full py-3 bg-[#74a4ee] text-white rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(116,164,238,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Message Therapist
              </motion.button>
              
              <motion.button
                className="w-full py-3 bg-white border border-[#74a4ee] text-[#74a4ee] rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(116,164,238,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Reschedule Session
              </motion.button>
              
              {session.status === "Upcoming" && (
                <motion.button
                  className="w-full py-3 bg-white border border-red-500 text-red-500 rounded-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(239,68,68,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Cancel Session
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
