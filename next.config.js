/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'wo'],
    defaultLocale: 'default'
  }
}

module.exports = nextConfig
