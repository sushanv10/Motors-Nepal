/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      backgroundImage:{
        'parallax':'url("https://images.unsplash.com/photo-1626931609469-383e0f6b3f8c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

