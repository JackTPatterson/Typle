import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  	],
	safelist: [
		'bg-[var(--background)]',
		'bg-[var(--foreground)]',
		'bg-[var(--card)]',
		'bg-[var(--card-foreground)]',
		'bg-[var(--popover)]',
		'bg-[var(--popover-foreground)]',
		'bg-[var(--primary)]',
		'bg-[var(--primary-foreground)]',
		'bg-[var(--secondary)]',
		'bg-[var(--secondary-foreground)]',
		'bg-[var(--muted)]',
		'bg-[var(--muted-foreground)]',
		'bg-[var(--accent)]',
		'bg-[var(--accent-foreground)]',
		'bg-[var(--destructive)]',
		'bg-[var(--destructive-foreground)]',
	],

  theme: {
  	extend: {
  		colors: {
  			background: '(var(--background))',
  			foreground: '(var(--foreground))',
  			card: {
  				DEFAULT: '(var(--card))',
  				foreground: '(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: '(var(--popover))',
  				foreground: '(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '(var(--primary))',
  				foreground: '(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '(var(--secondary))',
  				foreground: '(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: '(var(--muted))',
  				foreground: '(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: '(var(--accent))',
  				foreground: '(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: '(var(--destructive))',
  				foreground: '(var(--destructive-foreground))'
  			},
  			border: '(var(--border))',
  			input: '(var(--input))',
  			ring: '(var(--ring))',
  			chart: {
  				'1': '(var(--chart-1))',
  				'2': '(var(--chart-2))',
  				'3': '(var(--chart-3))',
  				'4': '(var(--chart-4))',
  				'5': '(var(--chart-5))'
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
