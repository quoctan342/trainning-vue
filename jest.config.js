module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel', 
  moduleDirectories: ["node_modules", "src"],
  transform: {
    'vee-validate/dist/rules': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vee-validate/dist/rules)',
  ],
  testMatch: [
    "**/src/**/*.spec.[jt]s?(x)",
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  // collectCoverage: true,
  // collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
}
