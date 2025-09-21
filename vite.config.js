import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configuración para desarrollo
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // Configuración de build para librería
  build: {
    lib: {
      // Punto de entrada de la librería
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'NexusUI',
      // Formatos de salida
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'NexusUI.esm.js';
        if (format === 'umd') return 'NexusUI.js';
        return `NexusUI.${format}.js`;
      }
    },
    
    // Configuración de salida
    outDir: 'dist',
    emptyOutDir: true,
    
    // Generar source maps
    sourcemap: true,
    
    // Configuración de minificación
    minify: 'esbuild',
    
    // Configuración de rollup
    rollupOptions: {
      // Externalizar dependencias que no deben ser incluidas en el bundle
      external: ['waaclock'],
      output: {
        // Configuración para UMD
        globals: {
          'waaclock': 'WAAClock'
        },
        exports: 'named'
      }
    },
    
    // Configuración de target para navegadores modernos
    target: ['es2020', 'chrome80', 'firefox78', 'safari14']
  },

  // Configuración de resolución de módulos
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib')
    }
  },

  // Configuración para desarrollo con ejemplos
  root: '.',
  publicDir: 'example',

  // Configuración de CSS
  css: {
    devSourcemap: true
  },

  // Configuración de optimización de dependencias
  optimizeDeps: {
    include: ['waaclock']
  }
});