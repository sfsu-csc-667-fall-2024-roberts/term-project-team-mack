/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,ejs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#DBD4AF",
                    
          "secondary": "#91351B",
                    
          "accent": "#f3f3f3",
                    
          "neutral": "#c8c8c8",
                    
          "base-100": "#FFFFFF",
                    
          "info": "#000000",
                    
          "success": "#34d399",
                    
          "warning": "#e11d48",
                    
          "error": "#ff0000",

          "redTeam": "#8F2B1C",

          "blueTeam": "#3384A3"
        },
      }
    ]
  }
}

