module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+vue$": "vue-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(.+vue$))"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
