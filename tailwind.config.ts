import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#00B86B',
        'primary-blue': '#4CBFFF',
        'verification-badge': '#B9E5C4',
      },
    },
  },
  plugins: [],
};

export default config;
