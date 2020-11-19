module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+vue$": "vue-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(.+vue$))"],
  setupFiles: ["jest-localstorage-mock"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
