export default {
  // Entorno de pruebas para DOM
  testEnvironment: 'jsdom',
  
  // Configuración para ES modules (no necesario en Jest 30 con type: module)
  transform: {},
  
  // Patrones de archivos de prueba
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Configuración de módulos
  moduleFileExtensions: ['js', 'json'],
  
  // Setup para Web Audio API mock
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Configuración de cobertura
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/**/*.test.js',
    '!lib/**/*.spec.js'
  ],
  
  // Directorio de salida de cobertura
  coverageDirectory: 'coverage',
  
  // Reportes de cobertura
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Configuración de globals para ES modules
  globals: {
    'jest': true
  },
  
  // Configuración de transformación para node_modules si es necesario
  transformIgnorePatterns: [
    'node_modules/(?!(waaclock)/)'
  ],
  
  // Configuración de timeout para pruebas de audio
  testTimeout: 10000
};