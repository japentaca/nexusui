import js from '@eslint/js';

export default [
  // Configuración base recomendada
  js.configs.recommended,
  
  {
    // Archivos a incluir
    files: ['lib/**/*.js', 'index.js'],
    
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Globales del navegador
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        
        // Globales de Web Audio API
        AudioContext: 'readonly',
        webkitAudioContext: 'readonly',
        OfflineAudioContext: 'readonly',
        
        // Globales de Canvas
        CanvasRenderingContext2D: 'readonly',
        
        // Globales de eventos
        Event: 'readonly',
        CustomEvent: 'readonly',
        MouseEvent: 'readonly',
        TouchEvent: 'readonly',
        
        // Globales de timing
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    
    rules: {
      // Reglas de estilo y buenas prácticas
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      
      // Reglas de variables
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-undef': 'error',
      'no-redeclare': 'error',
      
      // Reglas de funciones
      'no-unreachable': 'error',
      'no-duplicate-case': 'error',
      'default-case': 'warn',
      
      // Reglas de ES6+
      'prefer-const': 'warn',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error',
      
      // Reglas específicas para Web Audio
      'no-console': 'warn',
      'no-debugger': 'error',
      
      // Permitir algunas prácticas comunes en librerías de UI
      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off'
    }
  },
  
  {
    // Configuración específica para archivos de ejemplo
    files: ['example/**/*.js', 'api/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off'
    }
  },
  
  {
    // Ignorar archivos específicos
    ignores: [
      'dist/**',
      'node_modules/**',
      'api/js/jquery.js',
      'api/js/Tone9.js',
      'api/js/moustache.min.js',
      'api/prism/**',
      'example/js/**'
    ]
  }
];