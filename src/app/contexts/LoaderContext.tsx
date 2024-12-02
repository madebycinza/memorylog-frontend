'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LoaderContextType = {
  triggerReverseLoader: () => void;
  setShouldStayVisible: (value: boolean) => void;
  isVisible: boolean;
  isReverse: boolean;
  isInitial: boolean; // Reflects if the homepage is being accessed for the first time
  shouldStayVisible: boolean; // Indicates whether the loader should remain at 0vh
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true); // Loader starts visible
  const [isReverse, setIsReverse] = useState(false); // Direction of animation
  const [isInitial, setIsInitial] = useState(true); // Tracks if this is the homepage's initial load
  const [shouldStayVisible, setShouldStayVisible] = useState(false); // Track if loader should stay at 0vh
  const pathname = usePathname(); // Get the current route pathname

  // Automatically handle loader visibility based on route
  useEffect(() => {
    if (pathname === '/') {
      if (isInitial) {
        // If it's the first time on the homepage
        const timer = setTimeout(() => {
          setIsVisible(false); // Slide loader up after initial load
          setIsInitial(false); // Mark initial animation as complete
        }, 2000); // Match initial animation duration

        return () => clearTimeout(timer);
      } else {
        // If returning to the homepage after the first load
        const timer = setTimeout(() => {
          setIsVisible(false); // Slide loader up quickly (200ms)
          setShouldStayVisible(false); // Ensure loader stays off-screen
        }, 200);

        return () => clearTimeout(timer);
      }
    } else {
      // Leaving the homepage
      setIsVisible(true); // Ensure the loader is visible
      setIsReverse(true); // Trigger reverse animation
      setShouldStayVisible(true); // Keep the loader at 0vh on other routes

      // Reset `isReverse` after the reverse animation completes
      const reverseResetTimer = setTimeout(() => {
        setIsReverse(false);
      }, 700); // Match the reverse animation duration

      return () => clearTimeout(reverseResetTimer);
    }
  }, [pathname, isInitial]);

  const triggerReverseLoader = () => {
    setIsReverse(true); // Slide loader down
    setIsVisible(true); // Ensure the loader is visible
    setShouldStayVisible(true); // Keep loader at 0vh after animation

    // Reset `isReverse` after animation to avoid state issues
    setTimeout(() => {
      setIsReverse(false);
    }, 700); // Match the animation duration
  };

  return (
    <LoaderContext.Provider
      value={{
        triggerReverseLoader,
        setShouldStayVisible,
        isVisible,
        isReverse,
        isInitial,
        shouldStayVisible, // Expose `shouldStayVisible` for components
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
