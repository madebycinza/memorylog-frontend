'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LoaderContextType = {
  isInitial: boolean;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const LoaderContextProvider = createContext<LoaderContextType | undefined>(undefined);

export const LoaderContext = ({ children }: { children: React.ReactNode }) => {
  const [isInitial, setIsInitial] = useState(true); // Tracks if this is the homepage's initial load
  const [isVisible, setIsVisible] = useState(true); // Loader is visible by default
  const pathname = usePathname(); // Get the current route pathname

  // Automatically handle loader visibility based on route
  useEffect(() => {
    if (pathname === '/') {
      if (isInitial) {
        // If it's the first time on the homepage
        const timer = setTimeout(() => {
          setIsVisible(false); // Slide loader up after initial load
          setIsInitial(false); // Mark initial animation as complete
        }, 2000); // HomeTitle glitching and scaling should finish at 2500ms (last letter finished fading in at 1800ms), so trigger loader slide up while scaling is playing (500ms before scaling animation ends)
        return () => clearTimeout(timer);
      } else {
        // If returning to the homepage after the first load after 200ms, which is the default fade in of the content 
        const timer = setTimeout(() => {
          setIsVisible(false); // Slide loader up quickly (200ms)
        }, 200);
        return () => clearTimeout(timer);
      }
    } else {
      // Leaving the homepage
      setIsVisible(true); // Ensure the loader is visible and remains visible for all other pages
    }
  }, [pathname, isInitial]);

  return (
    <LoaderContextProvider.Provider
      value={{
        isInitial,
        isVisible,
        setIsVisible
      }}
    >
      {children}
    </LoaderContextProvider.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContextProvider);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider (HomeContext)');
  }
  return context;
};
