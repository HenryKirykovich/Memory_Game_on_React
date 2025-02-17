import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Memory_Game_on_React/', //Set base path to match  repository name
});


