/* eslint-disable @typescript-eslint/no-var-requires */

const { gitDescribeSync } = require("git-describe");
const { version } = require("./package.json");

process.env.VUE_APP_VERSION = version;
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

module.exports = {
  // Allow configuration via .env files.
  publicPath: process.env.BASE_URL,
};
