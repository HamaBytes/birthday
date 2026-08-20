import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  // GitHub Pages serves project sites from /<repository-name>/.
  // GitHub Actions supplies GITHUB_REPOSITORY as "owner/repository".
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const base = process.env.GITHUB_ACTIONS && repositoryName
    ? `/${repositoryName}/`
    : '/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
})
