import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Component } from "../../components/Component";
import { motion } from "framer-motion";

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        navigate("/getstarted1");
      }, 500); // Navigate after fade out animation completes
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="682:535"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[380px] h-[801px] relative">
        <motion.div 
          className="absolute w-[341px] h-[123px] top-[376px] left-[22px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="absolute w-[338px] h-[105px] top-0 left-0">
            <div className="absolute w-[336px] top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-new-fill-000000 text-[92px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              iMirror
            </div>
          </div>

          <p className="absolute w-[335px] top-[104px] left-1.5 [text-shadow:0px_4px_4px_#00000040] font-inter-regular font-[number:var(--inter-regular-font-weight)] [font-style:var(--inter-regular-font-style)] text-black text-[length:var(--inter-regular-font-size)] text-center tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)]">
            Know yourself from who knows you best!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Component className="!absolute !left-[157px] !top-[246px]" />
        </motion.div>
      </div>
    </motion.div>
  );
};
