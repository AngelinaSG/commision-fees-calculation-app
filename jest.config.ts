import type { JestConfigWithTsJest } from 'ts-jest';

import { defaults as tsjPreset } from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  transform: {
    ...tsjPreset.transform,
  },
};

export default jestConfig;
