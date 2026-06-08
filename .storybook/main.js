const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
};

module.exports = config;
