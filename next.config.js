/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: `http://${process.env.API_HOST}:${process.env.API_PORT}`,

  }

}

module.exports = nextConfig
