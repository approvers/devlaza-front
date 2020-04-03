module.exports = {
    plugins: [
        "prettier",
        "@typescript-eslint"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "prettier/prettier": "error"
    }
};
