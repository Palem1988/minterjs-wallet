module.exports = {
    moduleNameMapper: {
        '~\/src$': '<rootDir>/dist/index.js',
    },
    // transform: {
    //     '^.+\\.jsx?$': 'babel-jest',
    // },
    "testEnvironment": "<rootDir>/jest-environment-bundle.js",
};
