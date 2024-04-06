import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'scratch-ext', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: FurryR's example Extension
// ID: newExtension
// Description: Scaffolding for Advanced Scratch extensions.
// By: You
// Original: Me
// License: MPL-2.0
`
  },
  platform: 'browser',
  clean: true
})
