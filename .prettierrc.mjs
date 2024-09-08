import sharedConfig from "@kitschpatrol/prettier-config";

/** @type {import("prettier").Config} */
const localConfig = {
  // Config overrides
  overrides: [
    ...sharedConfig.overrides,
    {
      files: ["jest.config.ts"],
      options: {
        singleQuote: true,
      },
    },
  ],

  singleQuote: false,
  semi: true,
  bracketSameLine: true,
  useTabs: false,
  printWidth: 80,
};
export default {
  ...sharedConfig,
  ...localConfig,
};
