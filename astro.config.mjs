// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: "https://christian-library-assistant.github.io/",
  base: "project-website",
  integrations: [tailwind()]
});
