import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'sanity/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Handle CSS modules and other assets
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests/e2e/',
    '<rootDir>/node_modules/',
  ],
}

export default config