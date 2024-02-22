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
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
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

  return context;
};
