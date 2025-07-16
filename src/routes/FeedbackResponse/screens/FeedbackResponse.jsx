import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const FeedbackResponse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [templateName, setTemplateName] = useState("Feedback Form");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const template = queryParams.get("template");
    const questionsJson = queryParams.get("questions");

    if (template) {
      setTemplateName(template.replace(/-/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + " Feedback");
    }

    if (questionsJson) {
      try {
        setQuestions(JSON.parse(questionsJson));
      } catch (e) {
        console.error("Failed to parse questions from URL:", e);
        setQuestions([]);
      }
    }
  }, [location.search]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitFeedback = () => {
    // Basic validation: ensure all questions have an answer
    const allAnswered = questions.every(q => answers[q.id] && answers[q.id].trim() !== "");
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Construct anonymous message
    let fullMessage = `Anonymous feedback on your ${templateName.replace(' Feedback', '')}:\n`;
    questions.forEach(q => {
      fullMessage += `- ${q.text}: ${answers[q.id]}\n`;
    });

    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem("feedbackMessages") || "[]");
    const newMessage = {
      id: Date.now(),
      content: fullMessage,
      timestamp: new Date().toLocaleString(),
      template: templateName.replace(' Feedback', '')
    };
    const updatedMessages = [newMessage, ...existingMessages];
    localStorage.setItem("feedbackMessages", JSON.stringify(updatedMessages));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Optionally navigate to a thank you page or show a success message
    // For now, just show success message and then navigate back to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard"); // Navigate back to the main user's dashboard
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div className="bg-white flex flex-col items-center justify-center w-full min-h-screen">
        <motion.div
          className="bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] h-[801px] relative flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-4xl font-bold shadow-md mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          <h2 className="font-bold text-black text-2xl mb-2">Feedback Submitted!</h2>
          <p className="text-gray-700 text-base leading-relaxed text-center px-6">
            Thank you for providing your anonymous feedback.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] min-h-screen relative overflow-hidden pb-20">
        {/* Header */}
        <div className="absolute w-full h-[120px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center pt-10">
          <h1 className="font-bold text-inkdarkest text-xl mt-4">{templateName}</h1>
          <p className="text-gray-700 text-sm text-center mt-1 px-4">
            Please provide your honest and anonymous feedback below.
          </p>
        </div>

        {/* Form Area */}
        <div className="w-[350px] mx-auto mt-[140px] pb-20 space-y-4">
          {questions.length === 0 ? (
            <div className="bg-white rounded-[15px] shadow-md p-6 text-center">
              <p className="text-gray-600">No questions found. Please ensure the link is correct.</p>
            </div>
          ) : (
            questions.map((q) => (
              <motion.div
                key={q.id}
                className="bg-white rounded-[15px] shadow-md p-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-base font-medium text-black mb-2">{q.text}</p>
                <textarea
                  className="w-full p-2 text-base text-gray-700 outline-none resize-none min-h-[80px] rounded-md border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30"
                  placeholder="Your anonymous answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  rows="3"
                ></textarea>
              </motion.div>
            ))
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] h-12 rounded-[25px] text-white text-lg font-bold shadow-lg ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#74a4ee]"
          }`}
          whileHover={isSubmitting ? {} : { scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
          whileTap={isSubmitting ? {} : { scale: 0.97 }}
          onClick={handleSubmitFeedback}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Anonymous Feedback"}
        </motion.button>

        {/* Bottom Bar */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
