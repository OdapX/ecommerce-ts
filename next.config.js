/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['i.pinimg.com'],
  },
  env: {
    stripe_public_key: process.env.STRIKE_PUBLIC_KEY || '',
  },
  reactStrictMode: true,
}
