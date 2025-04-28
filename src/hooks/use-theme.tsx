// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'solarized';

const themes: Theme[] = ['light', 'dark', 'blue', 'solarized'];

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') as Theme;
            if (storedTheme && themes.includes(storedTheme)) {
                setTheme(storedTheme);
                document.documentElement.setAttribute('data-theme', storedTheme);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            const currentIndex = themes.indexOf(prev);
            const nextIndex = (currentIndex + 1) % themes.length;
            return themes[nextIndex];
        });
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        availableThemes: themes,
    };
}