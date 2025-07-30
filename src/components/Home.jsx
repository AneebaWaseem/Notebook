import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import Add from "./Add.jsx";

const Home = () => {
  const fullText =
    "Think it. Note it. Keep it.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col w-[90vw] md:w-[70vw]">
        {/* Gradient Animated Quote */}
        <Motion.p
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, #7f7f81ff, #85888bff, #7d7e7fff, #bdbdc0ff)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-4xl md:text-6xl font-bold mt-10 leading-[1.5]"
        >
          {displayedText}
          <span className="animate-pulse font-normal text-[#1802c2]"> | </span>
        </Motion.p>

        {/* Create */}
        <Add />
      </div>
    </div>
  );
};

export default Home;