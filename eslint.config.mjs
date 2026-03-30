import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // Keep intentionally relaxed for rapid development
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",

    // React rules
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react-compiler/react-compiler": "off",

    // Next.js rules
    "@next/next/no-img-element": "off",

    // General
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills"]
}];

export default eslintConfig;
