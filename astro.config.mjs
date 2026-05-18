// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.env.npm_lifecycle_event === 'dev';
const isVercel = !!process.env.VERCEL;

// https://astro.build/config
export default defineConfig({
  site: 'https://KazutoBlack2004.github.io',
  base: (isDev || isVercel) ? '/' : '/ApuntesDeOli',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['lucide-react']
    }
  }
});
