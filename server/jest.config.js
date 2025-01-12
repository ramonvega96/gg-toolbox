module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100000,
    testPathIgnorePatterns: ['<rootDir>/dist/'],
    globalSetup: "<rootDir>/test/globalSetup.ts",
    globalTeardown: "<rootDir>/test/globalTeardown.ts",
    setupFilesAfterEnv: [
      "<rootDir>/test/setupFile.ts"
    ],
    maxWorkers:4
  };