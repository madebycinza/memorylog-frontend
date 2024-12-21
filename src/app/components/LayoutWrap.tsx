'use client';

import { useState, useEffect } from "react";
import { useLoader } from "@/app/utils/LoaderContext";
import NavLayout from "@/app/components/NavLayout";
import HomeLoader from "@/app/components/HomeLoader";

export default function LayoutWrap({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const { isVisible: loaderVisible } = useLoader();

  // This delay is specific for the header and on the first page load
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
        transition: "opacity 500ms ease", // Smooth fade-in effect
      }}
    >
      <HomeLoader isVisible={loaderVisible} />
      <NavLayout></NavLayout>
      <main>
        {children}
      </main>
    </div>
  );
}
