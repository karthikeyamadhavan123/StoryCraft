import React, { createContext, useState, useContext } from "react";

// Define the shape of the context value
type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>];

// Create the ThemeContext with an initial value of null
const ThemeContext = createContext<ThemeContextType | null>(null);

// Create the provider component
const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export default ThemeContextProvider;
