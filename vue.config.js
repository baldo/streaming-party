/* eslint-disable @typescript-eslint/no-var-requires */

const { gitDescribeSync } = require("git-describe");
const { version, repository } = require("./package.json");

process.env.VUE_APP_VERSION = version;
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;
process.env.VUE_APP_SOURCE_URL = repository.url;

module.exports = {
  // Allow configuration via .env files.
  publicPath: process.env.BASE_URL,
};
