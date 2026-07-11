/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Tailwind ko class-driven state engine mode par set karein taaki dark/light flip ho sake
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic Inverted Core Palettes Mapping linked directly to index.css runtime variables
        carnetBg: "var(--bg-main)",         
        carnetSecondary: "var(--bg-panel)", 
        primaryBlue: "var(--accent-primary)",      
        accentCyan: "var(--accent-secondary)",       
        neonGreen: "#10B981", // Status metrics green remains vibrant in both modes
        neonRed: "#EF4444"    // Structural alerts red
      },
      boxShadow: {
        // Dynamic variable glows reflecting background mode opacity values
        neonGlow: "0 0 20px rgba(37, 99, 235, 0.45)",
        cyberGlow: "0 0 30px rgba(59, 130, 246, 0.2)",
        glassGlow: "var(--shadow-main)",
        innerNeon: "inset 0 0 12px rgba(59, 130, 246, 0.2)"
      },
      backgroundImage: {
        'cyber-gradient': "linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-main) 100%)",
        'neon-border': "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))"
      }
    },
  },
  plugins: [],
}