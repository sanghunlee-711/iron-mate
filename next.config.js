/** @type {import('next').NextConfig} */
// dev warning : https://github.com/GoogleChrome/workbox/issues/1790
const prod = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  disable: prod ? false : true,
  dest: 'public',
});

module.exports = withPWA;
