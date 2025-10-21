import { createContext, useContext, useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [effectiveTheme, setEffectiveTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      const { value } = await Preferences.get({ key: "theme" });
      if (value && (value === "dark" || value === "light" || value === "system")) {
        setThemeState(value as Theme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const updateEffectiveTheme = () => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        setEffectiveTheme(systemTheme);
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateEffectiveTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateEffectiveTheme);
      return () => mediaQuery.removeEventListener("change", updateEffectiveTheme);
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
    root.style.transition = "background-color 150ms ease-in-out, color 150ms ease-in-out";
  }, [effectiveTheme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await Preferences.set({ key: "theme", value: newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
