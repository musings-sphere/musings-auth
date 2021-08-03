module.exports = {
	verbose: true,
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	modulePathIgnorePatterns: ["<rootDir>/node_modules"],
	collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/interface.d.ts', '!src/**/*interfaces.d.ts'],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text',
    'clover'
  ],
	testEnvironment: "node",
};
