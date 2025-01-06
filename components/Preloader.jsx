// components/Preloader.js
import React, { useEffect } from "react";

const Preloader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop showing the preloader after 3 seconds
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="preloader">
    </div>
  );
};

export default Preloader;
