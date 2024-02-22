"use client";

import { createContext, useContext, useState, useEffect } from "react";

// ----------------------------------------------------------------

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>({
  mode: "",
  setMode: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState("");

  const handleChangeTheme = () => {
    if (mode === "dark") {
      // setMode("light");
      document.documentElement.classList.add("light");
    } else {
      // setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    handleChangeTheme();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within");
  }
};
