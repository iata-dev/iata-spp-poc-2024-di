module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 5,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/.*\\.module\\.ts$',
    '<rootDir>/.*\\.stub\\..*\\.ts$',
    '<rootDir>/modules/db/',
    '<rootDir>/modules/health/',
    '<rootDir>/common/',
    '<rootDir>/config/.*\\.test\\.ts$',
    '<rootDir>/main.ts',
  ],
  testEnvironmentOptions: {
    NODE_OPTIONS: '--unhandled-rejections=none',
  },
};
