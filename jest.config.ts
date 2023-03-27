// import { Config } from '@jest/types';
//
// const config: Config.InitialOptions = {
//   preset: "ts-jest",
//   rootDir: "src",
//   testEnvironment: "node",
//   verbose: true,
//   automock: true,
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "src/**/*.(js,jsx)",
//     "src/**/*.(ts,tsx)",
//     "!vendor/**/*.(js,jsx)",
//     "!**/node_modules/**"
//   ],
//   coverageThreshold: {
//     global: {
//       branches: 100,
//       functions: 100,
//       lines: 100,
//       statements: 100
//     }
//   },
// }
//
// export default config;

import type { JestConfigWithTsJest } from 'ts-jest'

import { defaults as tsjPreset } from 'ts-jest/presets'

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: "node",
  transform: {
    ...tsjPreset.transform,
    // [...]
  },
}

export default jestConfig
