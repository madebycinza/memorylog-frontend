'use client';

import { useState, useEffect } from "react";
import NavLayout from "@/components/NavLayout";

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false); // Control visibility

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
      <NavLayout>{children}</NavLayout>
    </div>
  );
}