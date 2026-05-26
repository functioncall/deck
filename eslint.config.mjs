import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // ADR-0005: the Tailwind theme (src/styles/theme.css) is the single styling
  // source. Forbid hard-coded color/size literals in components ONLY — theme,
  // config, styles, and other non-component files may use raw values.
  {
    files: ["src/components/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#(?:[0-9a-fA-F]{3,4}){1,2}(?![0-9a-fA-F])/]",
          message:
            "No hard-coded hex colors in components — use Tailwind theme tokens from src/styles/theme.css.",
        },
        {
          selector: "Literal[value=/(?:rgb|rgba|hsl|hsla)\\(/]",
          message:
            "No hard-coded color functions (rgb/rgba/hsl) in components — use theme tokens.",
        },
        {
          selector: "Literal[value=/\\d(?:\\.\\d+)?(?:px|rem|em)\\b/]",
          message:
            "No hard-coded size literals (px/rem/em) in components — use Tailwind utilities or theme tokens.",
        },
        {
          selector:
            "TemplateElement[value.raw=/#(?:[0-9a-fA-F]{3,4}){1,2}(?![0-9a-fA-F])/]",
          message:
            "No hard-coded hex colors in components — use Tailwind theme tokens from src/styles/theme.css.",
        },
        {
          selector: "TemplateElement[value.raw=/(?:rgb|rgba|hsl|hsla)\\(/]",
          message:
            "No hard-coded color functions (rgb/rgba/hsl) in components — use theme tokens.",
        },
        {
          selector: "TemplateElement[value.raw=/\\d(?:\\.\\d+)?(?:px|rem|em)\\b/]",
          message:
            "No hard-coded size literals (px/rem/em) in components — use Tailwind utilities or theme tokens.",
        },
      ],
    },
  },
]);

export default eslintConfig;
