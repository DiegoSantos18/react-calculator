import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(() => {
  const isGitHubPages = process.env.DEPLOY_TARGET === 'gh-pages';

  return {
    plugins: [react()],
    base: isGitHubPages ? '/react-calculator/' : '/',
  };
});