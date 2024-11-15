module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Указывает, какие файлы будут сканироваться на наличие классов Tailwind CSS
  theme: {
    extend: {
      fontFamily: {
        montblanc:["Mont Blanc", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      colors: { 'custom-green': '#0E6666',
      },
      ringColor: {
        DEFAULT: '#0E6666',
      }
    }, // Здесь вы можете добавить свои кастомные стили и расширения
  },
  plugins: [], // Здесь можно добавлять сторонние плагины Tailwind CSS, если это необходимо
};