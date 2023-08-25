export default {
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  projects: [
    {
      displayName: 'browser',
      testEnvironment: 'jsdom',
      testEnvironmentOptions: {
        url: 'http://localhost',
      },
      testMatch: ['**/test/**/*.test.[jt]s?(x)'],
      transform: {
        '^.+\\.[jt]sx?$': [
          'ts-jest',
          {
            useESM: true,
          }
        ]
      },
      transformIgnorePatterns: [
        'node_modules/(?!(unist|unist-util-select|unist-builder|devlop|zwitch)/)',
      ],
    },
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/test/**/*.ssr-test.[jt]s?(x)'],
    }
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.ssr-test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 100,
      statements: 100,
    },
  },
}
