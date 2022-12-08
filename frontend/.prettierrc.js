module.exports = {
  overrides: [
    {
      files: "*.(ts|tsx)$",
      options: require("@allen-packages/prettier-config"),
    },
    {
      files: "*.(css|scss|sass)$",
      options: {
        ...require("@allen-packages/prettier-config"),
      },
    },
  ],
};
