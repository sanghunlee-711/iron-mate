/** @type {import('next').NextConfig} */
// dev warning : https://github.com/GoogleChrome/workbox/issues/1790
const prod = process.env.NODE_ENV === "production";
const { withSentryConfig } = require("@sentry/nextjs");

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: "The-Folks",
  project: "iron-mate",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const nextConfig = require("next-pwa")({
  disable: prod ? false : true,
  dest: "public",
});

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
