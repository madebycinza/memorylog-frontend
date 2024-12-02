'use client';

import { useState, useEffect } from "react";
import NavLayout from "./NavLayout";
import HomeLoader from "./HomeLoader";
import { useLoader } from "../contexts/LoaderContext";

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false); // Control fade-in effect
  const { isVisible: loaderVisible, isReverse, isInitial, shouldStayVisible } = useLoader(); // Include `shouldStayVisible`

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Trigger fade-in after page load
    }, 200); // Delay for smoother effect

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0, // Dynamically set opacity
        transition: "opacity 0.8s ease", // Smooth fade-in effect
      }}
    >
      {/* Full-Screen Loader */}
      <HomeLoader 
        isVisible={loaderVisible} 
        isReverse={isReverse} 
        isInitial={isInitial} 
        shouldStayVisible={shouldStayVisible} // Pass the flag
      />

      <NavLayout>{children}</NavLayout>
    </div>
  );
}
