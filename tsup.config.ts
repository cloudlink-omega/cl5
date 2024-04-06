import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'scratch-ext', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// CL5
// ID: cl5
// Description: CloudLink 5 protocol extension. Unleash your potential.
// By: MikeDEV
// License: MIT
`
  },
  platform: 'browser',
  clean: true
})
